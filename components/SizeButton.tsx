"use client"

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SizeButtonProps {
  size: string;
  stock: number;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
}

const SizeButton: React.FC<SizeButtonProps> = ({ 
  size, 
  stock, 
  isSelected, 
  onSelect, 
  className = "" 
}) => {
  const sizeRef = useRef<HTMLDivElement>(null);
  const stockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sizeElement = sizeRef.current;
    const stockElement = stockRef.current;
    const buttonElement = buttonRef.current;

    if (!sizeElement || !stockElement || !buttonElement) return;

    // Set initial states
    gsap.set(sizeElement, { y: 0 });
    gsap.set(stockElement, { y: 0, opacity: 0 });

    const handleMouseEnter = () => {
      // Animate size number up
      gsap.to(sizeElement, {
        y: -8,
        duration: 0.4,
        ease: "back.out(1.7)"
      });

      // Animate stock count down and fade in
      gsap.to(stockElement, {
        y: 12,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      // Reset size number to center
      gsap.to(sizeElement, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset stock count to center and fade out
      gsap.to(stockElement, {
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    buttonElement.addEventListener('mouseenter', handleMouseEnter);
    buttonElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      buttonElement.removeEventListener('mouseenter', handleMouseEnter);
      buttonElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onSelect}
      disabled={stock === 0}
      className={`p-4 rounded-lg border-2 text-center transition-all relative overflow-hidden h-20 ${
        isSelected
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
          : stock > 0
          ? 'border-gray-200 dark:border-dark-accent hover:border-purple-300 dark:hover:border-purple-500 text-jewelry-dark dark:text-dark-text'
          : 'border-gray-200 dark:border-dark-accent bg-gray-50 dark:bg-dark-accent text-gray-400 dark:text-dark-muted cursor-not-allowed opacity-50'
      } ${className}`}
    >
      {/* Size Number - Starts in center, moves up on hover */}
      <div 
        ref={sizeRef}
        className="text-xl font-bold absolute inset-0 flex items-center justify-center"
      >
        {size}
      </div>
      
      {/* Stock Count - Starts in center (invisible), moves down and fades in on hover */}
      <div 
        ref={stockRef}
        className="text-xs font-medium absolute inset-0 flex items-center justify-center"
      >
        {stock > 0 ? (
          <span className="text-green-600 dark:text-green-400">{stock} left</span>
        ) : (
          <span className="text-red-500 dark:text-red-400">Out of stock</span>
        )}
      </div>
    </button>
  );
};

export default SizeButton;