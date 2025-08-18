"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

const CartSlideout: React.FC = () => {
  const { state, dispatch } = useCart();
  
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'TOGGLE_CART' });
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-dark-card shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 dark:border-dark-accent flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="text-purple-500 dark:text-purple-400" size={24} />
                <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">
                  Shopping Cart ({state.items.length})
                </h2>
              </div>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-dark-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex space-x-4"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-jewelry-dark dark:text-dark-text mb-1">
                      {item.name}
                    </h3>
                    <p className="text-purple-500 dark:text-purple-400 font-medium mb-2">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                        >
                          <Minus size={16} className="text-gray-500 dark:text-dark-muted" />
                        </button>
                        <span className="w-8 text-center text-jewelry-dark dark:text-dark-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                        >
                          <Plus size={16} className="text-gray-500 dark:text-dark-muted" />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {state.items.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
                  <p className="text-gray-500 dark:text-dark-muted">Your cart is empty</p>
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-dark-accent">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-jewelry-dark dark:text-dark-text">Total</span>
                  <span className="text-2xl font-serif text-purple-500 dark:text-purple-400">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <button className="w-full py-3 bg-purple-gradient rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartSlideout;