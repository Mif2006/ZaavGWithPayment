"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, ShoppingCart } from 'lucide-react';
import Cart from './Cart';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  currentPage: 'landing' | 'dashboard' | 'catalog';
  setCurrentPage: (page: 'dashboard' | 'catalog') => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  hasEnteredSite: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
  setIsMobileMenuOpen,
  hasEnteredSite
}) => {
  return (
    <header className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-elegant dark:shadow-dark-elegant sticky top-0 z-30 transition-colors duration-300 ${currentPage === 'landing' ? 'bg-transparent dark:bg-transparent shadow-none' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
        
            <button
              onClick={() => {
                if (hasEnteredSite) {
                  window.location.reload();
                }
              }}
              className={`text-xl md:text-2xl font-serif ${currentPage === 'landing' ? 'text-white' : 'text-jewelry-dark dark:text-dark-text'}`}
            >
              Zaavg
            </button>
          </motion.div>
          
          {hasEnteredSite && (
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('catalog')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'catalog'
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-gray-600 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400'
                }`}
              >
                Catalog
              </button>
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {hasEnteredSite && (
            <button
              className="block md:hidden p-2 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          )}
          <button 
            className={`p-2 transition-colors ${
              currentPage === 'landing'
                ? 'text-white hover:text-purple-200'
                : 'text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light'
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {hasEnteredSite && <Cart />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;