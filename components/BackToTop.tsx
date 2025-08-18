"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-dark-card shadow-elegant dark:shadow-dark-elegant rounded-full text-purple-500 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowUp size={24} />
          </motion.div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-dark-card px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap">
            Back to top
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;