// components/Navbar.tsx (updated)
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { Menu, X, Home, ShoppingBag, Star, Store, Users, Ruler, Gem } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartSheet from '@/components/cart/CartSheet'; // Add this import

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  const navItems = [
    {
      name: "Главная",
      icon: Home,
      action: () => scrollToSection('truehero'),
      type: 'scroll'
    },
    {
      name: "Особенности",
      icon: Star,
      action: () => scrollToSection('features'),
      type: 'scroll'
    },
    {
      name: "Бестселлеры",
      icon: Gem,
      action: () => scrollToSection('bestsellers'),
      type: 'scroll'
    },
    {
      name: "Магазин",
      icon: Store,
      action: () => scrollToSection('shop'),
      type: 'scroll'
    },
    {
      name: "Отзывы",
      icon: Users,
      action: () => scrollToSection('testimonials'),
      type: 'scroll'
    },
    {
      name: "Размеры",
      icon: Ruler,
      action: () => scrollToSection('size'),
      type: 'scroll'
    },
    {
      name: "Каталог",
      icon: ShoppingBag,
      link: "/catalog",
      type: 'link'
    }
  ];

  const scrollToSection = (sectionId) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    let targetElement = document.getElementById(sectionId);
    
    if (!targetElement) {
      switch(sectionId) {
        case 'truehero':
          targetElement = document.querySelector('#truehero') || document.querySelector('section');
          break;
        case 'features':
          targetElement = document.querySelector('#features') || document.querySelector('#highlight') || 
                        document.querySelectorAll('section')[2];
          break;
        case 'bestsellers':
          targetElement = document.querySelector('#bestsellers') || document.querySelector('#tech') ||
                        document.querySelectorAll('section')[3];
          break;
        case 'shop':
          targetElement = document.querySelector('#shop') || document.querySelectorAll('section')[4];
          break;
        case 'testimonials':
          targetElement = document.querySelector('#testimonials') || document.querySelectorAll('section')[5];
          break;
        case 'size':
          targetElement = document.querySelector('#size') || document.querySelectorAll('section')[6];
          break;
        default:
          targetElement = document.querySelector('section');
      }
    }

    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }

    setIsMenuOpen(false);
  };

  const handleItemClick = (item) => {
    if (item.type === 'scroll') {
      item.action();
    }
    setIsMenuOpen(false);
  };

  useGSAP(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );
  }, []);

  return (
    <nav 
      ref={navRef}
      className='fixed top-0 left-0 right-0 w-full h-[80px] bg-black/90 backdrop-blur-xl border-b border-purple-500/30 z-50 shadow-2xl'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
        <div className='flex items-center justify-between h-full'>
          
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link 
              href="/" 
              className='text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 transition-all duration-300'
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ZAAVG
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-2 xl:space-x-3'>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              
              if (item.type === 'link') {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className='group flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:text-purple-300 transition-all duration-300 hover:bg-purple-500/20 font-medium text-sm xl:text-base border border-transparent hover:border-purple-500/30'
                  >
                    <Icon className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className='group flex items-center gap-2 px-4 py-2 rounded-xl text-white hover:text-purple-300 transition-all duration-300 hover:bg-purple-500/20 font-medium text-sm xl:text-base border border-transparent hover:border-purple-500/30'
                >
                  <Icon className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Cart Button - ADD THIS */}
          <div className='hidden lg:block'>
            <CartSheet />
          </div>

          {/* Mobile menu button */}
          <div className='lg:hidden flex items-center gap-2'>
            {/* Cart Button for mobile */}
            <div className='lg:hidden'>
              <CartSheet />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 rounded-lg text-white hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-300'
            >
              {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - UNCHANGED */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-purple-500/20 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible max-h-96' : 'opacity-0 invisible max-h-0'
        }`}>
          <div className='px-4 py-6 space-y-2'>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              
              if (item.type === 'link') {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    className='group flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-purple-300 transition-all duration-300 hover:bg-purple-500/10 w-full text-left'
                  >
                    <Icon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                    <span className='font-medium'>{item.name}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className='group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:text-purple-300 transition-all duration-300 hover:bg-purple-500/10 text-left'
                >
                  <Icon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                  <span className='font-medium'>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;