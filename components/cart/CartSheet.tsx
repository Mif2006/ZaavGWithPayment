// components/cart/CartSheet.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

// Types for cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

const CartSheet = () => {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          // Ensure it's an array
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          } else {
            console.warn('Cart data is not an array, resetting to empty array');
            setCartItems([]);
          }
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]); // Fallback to empty array
      }
    };

    loadCartFromStorage();
  }, []);

  // In CartSheet.tsx, add this useEffect:
useEffect(() => {
    const handleCartUpdate = () => {
      // Reload cart data when notified
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
  
    // Listen for cart updates
    window.addEventListener('cartUpdated', handleCartUpdate);
  
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotalItems = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative p-2 rounded-full hover:bg-purple-500/20 transition-colors"
        >
          <ShoppingCart className="h-6 w-6 text-white" />
          {getTotalItems() > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg border-l border-purple-500/30 bg-black/90 backdrop-blur-xl p-0"
      >
        <SheetHeader className="border-b border-purple-500/20 pb-4 px-6 pt-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-white flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-purple-500/20">
                <X className="h-4 w-4 text-white" />
              </Button>
            </SheetClose>
          </div>
          <p className="text-sm text-gray-400">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
          </p>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] py-6 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-4">Add some items to your cart</p>
              <SheetClose asChild>
                <Button className="bg-purple-gradient hover:opacity-90">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  {item.image ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="h-8 w-8 text-purple-400" />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-base truncate">{item.name}</h4>
                    {item.size && (
                      <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>
                    )}
                    <p className="text-purple-400 font-medium text-lg mt-2">₽{Number(item.price).toLocaleString() || '0'}</p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-purple-500/30 hover:bg-purple-500/20 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4 text-white" />
                      </Button>
                      <span className="w-8 text-center text-white font-medium text-base">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full border-purple-500/30 hover:bg-purple-500/20 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-red-500/20"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {cartItems.length > 0 && (
          <div className="border-t border-purple-500/20 pt-6 px-6 pb-6">
            <div className="flex justify-between text-xl font-bold text-white mb-6">
              <span>Total:</span>
              <span>₽{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex gap-3">
              <SheetClose asChild>
                <Button 
                  variant="" 
                  className="flex-1 border-purple-500/30 text-white hover:bg-purple-500/20 h-12"
                >
                  Continue Shopping
                </Button>
              </SheetClose>
              <Button className="flex-1 bg-purple-gradient hover:opacity-90 h-12">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;