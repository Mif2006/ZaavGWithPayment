"use client"

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Send, MessageCircle, MapPin, Phone, Mail, Gem, Heart, ExternalLink, ArrowUp } from 'lucide-react';
import Link from 'next/link';  // Correct Next.js link import

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;

    if (!footer || !logo || !content) return;

    // Animate footer entrance
   // Animate footer content entrance (keep background static)
    gsap.fromTo(
    content,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    }
  );
  

    // Animate logo with floating effect
    gsap.to(logo, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Stagger animate content sections
    gsap.fromTo(content.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 },
      ease: "power2.inOut"
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/zaavg',
      color: 'hover:text-pink-400'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://t.me/zaavg',
      color: 'hover:text-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/zaavg',
      color: 'hover:text-green-400'
    }
  ];

  const quickLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Особенности', href: '#features' },
    { name: 'Бестселлеры', href: '#bestsellers' },
    { name: 'Магазин', href: '#shop' },
    { name: 'Отзывы', href: '#testimonials' },
    { name: 'Размеры', href: '#size' },
    { name: 'Каталог', href: '/catalogue' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-t from-black via-purple-950/30 to-black border-t border-purple-500/20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-400/3 rounded-full blur-xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div ref={logoRef} className="relative">
                <Gem className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 w-8 h-8 bg-purple-400/20 rounded-full blur-md"></div>
              </div>
              <h2 
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ZAAVG
              </h2>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Авторские украшения с острова Бали. Каждое изделие создается вручную с особой энергетикой 
              и уникальным дизайном, вдохновленным древними символами и природой.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-gray-200 text-sm">Следите за нами:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-white/5 border border-white/10 text-gray-200 
                                ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10
                                hover:border-white/20 hover:shadow-lg`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              Навигация
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-200 hover:text-purple-300 transition-colors duration-300 
                             text-sm flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Контакты
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-200 mt-0.5 flex-shrink-0" />
                <div className="text-gray-100">
                  <p>Клементовский пер. 2</p>
                  <p>Москва, Россия</p>
                  <p className="text-xs text-gray-100 mt-1">м. Новокузнецкая/Третьяковская</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-200 flex-shrink-0" />
                <a 
                  href="tel:+7-xxx-xxx-xxxx" 
                  className="text-gray-100 hover:text-purple-300 transition-colors"
                >
                  +7 (xxx) xxx-xxxx
                </a>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-200 flex-shrink-0" />
                <a 
                  href="mailto:info@zaavg.com" 
                  className="text-gray-100 hover:text-purple-300 transition-colors"
                >
                  info@zaavg.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-200 text-sm text-center sm:text-left">
            <p>&copy; 2025 ZAAVG. Все права защищены.</p>
            <p className="text-xs mt-1">Создано с ❤️ на острове Бали</p>
          </div>
          
          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gradient-to-r from-purple-500/20 to-indigo-500/20 
                     border border-purple-500/30 text-gray-200 hover:text-white
                     transition-all duration-300 hover:scale-105 hover:shadow-lg
                     hover:from-purple-500/30 hover:to-indigo-500/30"
          >
            <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
            <span className="text-sm">Наверх</span>
          </button>
        </div>
      </div>

      {/* Subtle glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
