// components/catalog/Catalog.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { CatalogItem } from '@/lib/hooks/useCatalogData';

interface CatalogProps {
  items: CatalogItem[];
  onItemClick: (item: CatalogItem) => void;
  selectedProduct: CatalogItem | null;
  setSelectedProduct: (product: CatalogItem | null) => void;
  showSizeModal: boolean;
  setShowSizeModal: (show: boolean) => void;
}

// Function to add item to localStorage cart
// Function to add item to localStorage cart
const addToLocalStorageCart = (item: any) => {
  try {
    // Generate a unique ID for the cart item
    const cartItemId = `${item.name}-${item.size || 'nosize'}-${Date.now()}`;
    
    // Get existing cart from localStorage
    const storedCart = localStorage.getItem('cart');
    let cartItems: any[] = storedCart ? JSON.parse(storedCart) : [];
    
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem: any) => cartItem.id === cartItemId
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cartItems.push({
        ...item,
        id: cartItemId,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch a custom event to notify CartSheet of changes
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    // Optional: Show success feedback
    console.log('Item added to cart:', item);
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

const Catalog: React.FC<CatalogProps> = ({ 
  items, 
  onItemClick, 
  selectedProduct, 
  setSelectedProduct, 
  showSizeModal, 
  setShowSizeModal 
}) => {
  const router = useRouter();
  
  // Mock wishlist functions (you can implement these later)
  const wishlist = [];
  const toggleWishlist = (item: CatalogItem) => {
    console.log('Toggle wishlist:', item);
    // Implement wishlist logic
  };
  
  const handleAddToCart = (item: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If item has sizes, show size selection modal
    if (item.sizes && Object.keys(item.sizes).length > 0) {
      setSelectedProduct(item);
      setShowSizeModal(true);
    } else {
      // If no sizes, add directly to cart
      const cartItem = {
        name: item.name,
        price: item.price || 0,
        image: item.imgLink || item.imageUrl,
        // Add other properties you want to store
      };
      
      const success = addToLocalStorageCart(cartItem);
      if (success) {
        // Optional: Show visual feedback
        // You could add a toast notification here
      }
    }
  };
  
  const handleLearnMore = (item: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert product name to URL-friendly format
    const productName = encodeURIComponent(item.name);
    router.push(`/catalog/item/${productName}`);
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={64} className="mx-auto mb-4 text-gray-300 dark:text-dark-accent" />
        <p className="text-gray-500 dark:text-dark-muted text-lg">No items found in this category</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-black/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/20 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-purple-400/60 dark:hover:border-purple-400/60"
          onClick={() => onItemClick(item)}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="relative aspect-square overflow-hidden cursor-pointer" onClick={(e) => handleLearnMore(item, e)}>
            {item.isNew.toString().toUpperCase() === 'TRUE' && (
              <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-purple-gradient rounded-full">
                <span className="text-xs text-white font-medium">New</span>
              </div>
            )}
            {/* {item.collection && item.collection !== 'FALSE' && (
              <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-black/70 dark:bg-black/70 backdrop-blur-sm rounded-full shadow-sm border border-white/20 dark:border-white/20">
                <span className="text-xs text-purple-300 dark:text-purple-300 font-medium capitalize">{item.collection}</span>
              </div>
            )} */}
            <img
              src={item.imgLink || item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-black/70 dark:bg-black/70 backdrop-blur-sm rounded-full text-purple-300 hover:text-purple-200 dark:text-purple-300 dark:hover:text-purple-200 transition-colors shadow-lg border border-white/20 dark:border-white/20">
                <Share2 size={18} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
                className="p-2 bg-black/70 dark:bg-black/70 backdrop-blur-sm rounded-full transition-colors shadow-lg border border-white/20 dark:border-white/20"
              >
                <Heart 
                  size={18} 
                  className={wishlist.some((w: any) => w.id === item.id) 
                    ? "text-red-500 fill-red-500" 
                    : "text-purple-500 dark:text-purple-400"
                  } 
                />
              </button>
            </div>
          </div>
          <div className="p-4 h-full to-black/30 dark:from-black/50 dark:to-black/30 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-serif text-white dark:text-white line-clamp-2 font-medium">{item.name}</h3>
              <p className="text-lg font-serif text-purple-300 dark:text-purple-300 whitespace-nowrap ml-2 font-semibold">
                ₽{(item.price || 0).toLocaleString()}
              </p>
            </div>
            
            <p className="text-xs text-gray-300 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
              {item.collection || 'No description available'}
            </p>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleLearnMore(item, e)}
                className="flex-1 px-3 py-2 bg-black/50 dark:bg-black/50 backdrop-blur-md border-2 border-purple-400/70 dark:border-purple-400/70 rounded-lg text-purple-200 dark:text-purple-200 font-medium text-xs hover:bg-purple-900/40 dark:hover:bg-purple-900/40 transition-all duration-200 flex items-center justify-center space-x-1 shadow-sm hover:shadow-md"
                style={{
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)'
                }}
              >
                <span>Learn More</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToCart(item, e)}
                disabled={item.sizes && Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0)}
                className="flex-1 px-3 py-2 bg-purple-gradient rounded-lg text-white font-medium text-xs hover:opacity-90 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                style={{
                  background: 'linear-gradient(to right, #8B5CF6, #6366F1)'
                }}
              >
                <ShoppingCart size={14} />
                <span>
                  {item.sizes && Object.keys(item.sizes).length > 0 && Object.values(item.sizes).every(qty => qty === 0) 
                    ? 'Out of Stock' 
                    : 'Add to Cart'
                  }
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Catalog;