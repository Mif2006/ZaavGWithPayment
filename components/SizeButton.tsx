"use client"

import React from 'react';

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
  return (
    <button
      onClick={onSelect}
      disabled={stock === 0}
      className={`p-4 rounded-lg border-2 text-center transition-all h-12 flex items-center justify-center ${
        isSelected
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
          : stock > 0
          ? 'border-gray-200 dark:bg-purple-900/20 dark:border-dark-accent hover:border-purple-300 dark:hover:border-purple-500 text-gray-300'
          : 'border-gray-200 dark:border-dark-accent bg-gray-50 dark:bg-dark-accent text-gray-400 dark:text-dark-muted cursor-not-allowed opacity-50'
      } ${className}`}
    >
      <span className="text-lg font-bold">
        {size}
        {stock === 0 && (
          <span className="text-xs ml-1 text-red-500 dark:text-red-400"></span>
        )}
      </span>
    </button>
  );
};

export default SizeButton;