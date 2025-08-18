"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, RotateCcw } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const [pendingDeletes, setPendingDeletes] = useState<Set<string>>(new Set());
  const [deleteTimers, setDeleteTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());
  const cartRef = React.useRef<HTMLDivElement>(null);
  
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle clicks outside the cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        dispatch({ type: 'TOGGLE_CART' });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const updateQuantity = (id: string, quantity: number, maxStock?: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      // Limit quantity to available stock
      const finalQuantity = maxStock ? Math.min(quantity, maxStock) : quantity;
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: finalQuantity } });
    }
  };

  const getAvailableStock = (item: any) => {
    if (!item.sizes || Object.keys(item.sizes).length === 0) {
      return 999; // No size restrictions, allow high quantity
    }
    
    if (item.selectedSize && item.sizes[item.selectedSize]) {
      return item.sizes[item.selectedSize];
    }
    
    // If no specific size selected, use the first available size's stock
    const availableSizes = Object.entries(item.sizes).filter(([_, qty]) => (qty as number) > 0);
    return availableSizes.length > 0 ? (availableSizes[0][1] as number) : 0;
  };

  const handleDeleteClick = (itemId: string) => {
    // Add to pending deletes
    setPendingDeletes(prev => new Set([...prev, itemId]));
    
    // Set up timer for actual deletion
    const timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
      setPendingDeletes(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      setDeleteTimers(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemId);
        return newMap;
      });
    }, 3000);

    setDeleteTimers(prev => new Map([...prev, [itemId, timer]]));
  };

  const handleUndoDelete = (itemId: string) => {
    // Clear the timer
    const timer = deleteTimers.get(itemId);
    if (timer) {
      clearTimeout(timer);
    }
    
    // Remove from pending deletes
    setPendingDeletes(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    
    setDeleteTimers(prev => {
      const newMap = new Map(prev);
      newMap.delete(itemId);
      return newMap;
    });
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      deleteTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <>
      <button 
        className="relative p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-500 hover:text-purple-500 dark:text-dark-muted dark:hover:text-purple-light transition-colors"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
        aria-label="Shopping Cart"
      >
        <ShoppingCart size={20} />
        {state.items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-gradient text-white text-xs font-medium rounded-full flex items-center justify-center shadow-lg">
            {state.items.length}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {state.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              ref={cartRef}
              className="fixed right-0 top-0 h-screen w-full max-w-[400px] bg-white dark:bg-dark-card shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-accent flex justify-between items-center bg-white dark:bg-dark-card">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="text-purple-500 dark:text-purple-400" size={24} />
                  <h2 className="text-xl font-serif text-jewelry-dark dark:text-dark-text">
                    Shopping Cart {state.items.length > 0 && `(${state.items.length})`}
                  </h2>
                </div>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} className="text-gray-500 dark:text-dark-muted" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-6">
                  <div className="space-y-4">
                    {state.items.map(item => {
                      const availableStock = getAvailableStock(item);
                      const isOutOfStock = availableStock === 0;
                      const itemKey = item.selectedSize 
                        ? `${item.id}-${item.selectedSize}`
                        : item.id;
                      const isPendingDelete = pendingDeletes.has(itemKey);
                      
                      return (
                        <motion.div
                          key={itemKey}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative flex space-x-4 bg-gray-50 dark:bg-dark-accent/30 p-4 rounded-xl border border-gray-100 dark:border-dark-accent"
                        >
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-dark-card shadow-md">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-jewelry-dark dark:text-dark-text text-sm mb-1 truncate">
                              {item.name}
                            </h3>
                            
                            {/* Show selected size if available */}
                            {item.selectedSize && (
                              <p className="text-xs text-gray-600 dark:text-dark-muted mb-1">
                                Size: {item.selectedSize}
                              </p>
                            )}
                            
                            <p className="text-purple-500 dark:text-purple-400 font-medium text-lg mb-2">
                              ₽{(item.price * item.quantity).toLocaleString()}
                            </p>
                            
                            {/* Stock warning */}
                      
                            {isOutOfStock && (
                              <p className="text-xs text-red-500 dark:text-red-400 mb-2">
                                Out of stock
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1 bg-white dark:bg-dark-card rounded-lg shadow-sm">
                                <button
                                  onClick={() => updateQuantity(itemKey, item.quantity - 1, availableStock)}
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} className="text-gray-500 dark:text-dark-muted" />
                                </button>
                                <span className="w-8 text-center font-medium text-jewelry-dark dark:text-dark-text text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(itemKey, item.quantity + 1, availableStock)}
                                  disabled={item.quantity >= availableStock}
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} className="text-gray-500 dark:text-dark-muted" />
                                </button>
                              </div>
                              <button
                                onClick={() => handleDeleteClick(itemKey)}
                                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 hover:text-red-600 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Glassmorphism Delete Overlay */}
                          <AnimatePresence>
                            {isPendingDelete && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 overflow-hidden"
                              >
                                <div className="text-center">
                                  <p className="text-sm font-medium text-jewelry-dark dark:text-dark-text mb-4">
                                    Are you sure you want to remove this item?
                                  </p>
                                  
                                  {/* Red Circle Timer */}
                                  <div className="relative w-16 h-16 mx-auto mb-4">
                                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                                      <motion.circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        fill="currentColor"
                                        className="text-red-500 dark:text-red-400"
                                        initial={{ scale: 1 }}
                                        animate={{ scale: 0 }}
                                        transition={{ duration: 3, ease: "linear" }}
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Trash2 size={20} className="text-white" />
                                    </div>
                                  </div>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleUndoDelete(itemKey)}
                                    className="px-4 py-2 bg-purple-gradient rounded-lg text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg"
                                  >
                                    <RotateCcw size={14} />
                                    <span>Undo</span>
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                    
                    {state.items.length === 0 && (
                      <div className="text-center py-12">
                        <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
                        <p className="text-gray-500 dark:text-dark-muted text-lg">Your cart is empty</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className="px-6 py-6 border-t border-gray-100 dark:border-dark-accent bg-white dark:bg-dark-card">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-jewelry-dark dark:text-dark-text text-lg">Total</span>
                    <span className="text-2xl font-serif text-purple-500 dark:text-purple-400">
                      ₽{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button className="w-full py-4 bg-purple-gradient rounded-xl text-white font-medium text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;