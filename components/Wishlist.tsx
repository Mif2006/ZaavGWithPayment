"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import type { WishlistItem } from '@/lib/types/types';

interface WishlistProps {
  items: WishlistItem[];
}

const Wishlist: React.FC<WishlistProps> = ({ items }) => {
  const { dispatch, toggleWishlist } = useCart();
  const [itemToDelete, setItemToDelete] = React.useState<WishlistItem | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-dark-card rounded-2xl shadow-elegant dark:shadow-dark-elegant overflow-hidden group"
        >
          <div className="relative h-96 overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 dark:bg-dark-card/90 rounded-full text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                <Share2 size={18} />
              </button>
              <button
                onClick={() => setItemToDelete(item)}
                className="p-2 bg-white/90 dark:bg-dark-card/90 rounded-full text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors" 
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">{item.name}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 -mr-2 text-purple-500 dark:text-purple-400"
              >
                <Heart size={20} fill="currentColor" />
              </motion.button>
            </div>
            <p className="text-gray-600 dark:text-dark-muted mb-4 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-serif text-purple-500 dark:text-purple-300">
                ${item.price.toLocaleString()}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
                className="px-4 py-2 bg-purple-gradient rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      
      <AnimatePresence>
        {itemToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
                Remove from Wishlist?
              </h3>
              <p className="text-gray-600 dark:text-dark-muted mb-6">
                Are you sure you want to remove "{itemToDelete.name}" from your wishlist?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-dark-accent rounded-lg text-gray-600 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-dark-accent/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toggleWishlist(itemToDelete);
                    setItemToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;