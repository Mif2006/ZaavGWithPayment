"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import Cart from './Cart';

interface MinimizedNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isVisible: boolean;
}

const MinimizedNavbar: React.FC<MinimizedNavbarProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  setIsMobileMenuOpen,
  isVisible 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-elegant dark:shadow-dark-elegant"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
              >
                <Menu size={20} />
              </button>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center space-x-3"
              >
             
                <h1 className="text-lg font-serif text-jewelry-dark dark:text-dark-text">
                  ZaavG <span className="text-purple-500"></span>
                </h1>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Cart />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MinimizedNavbar