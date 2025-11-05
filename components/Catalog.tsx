'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CatalogCard from './CatalogCard';
import type { CatalogItem } from '@/lib/hooks/useCatalogData';

interface CatalogProps {
  items: CatalogItem[];
  onItemClick: (item: CatalogItem) => void;
  selectedProduct?: CatalogItem | null;
  setSelectedProduct?: React.Dispatch<React.SetStateAction<CatalogItem | null>>;
  showSizeModal?: boolean;
  setShowSizeModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Catalog: React.FC<CatalogProps> = ({
  items,
  onItemClick,
  selectedProduct,
  setSelectedProduct,
  showSizeModal,
  setShowSizeModal,
}) => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<CatalogItem[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  // 🛒 Initialize cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // ❤️ Toggle Wishlist
  const toggleWishlist = (item: CatalogItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      return exists ? prev.filter((w) => w.id !== item.id) : [...prev, item];
    });
  };

  // 🧭 Navigate to product page
  const handleLearnMore = (item: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const slug = item.name.replace(/\s+/g, '-').toLowerCase();
    router.push(`/catalog/item/${slug}`);
  };

  // 🛍️ Add to cart
  const handleAddToCart = (item: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();

    const cartItem = {
      ...item,
      id: `${item.id}-${Date.now()}`,
      quantity: 1,
    };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Custom event so other components (CartSheet, etc.) can react
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <section className="w-full min-h-screen py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-2"
      >
        {items.map((item, index) => (
          <CatalogCard
            key={item.id || index}
            item={item}
            index={index}
            onItemClick={onItemClick}
            onAddToCart={handleAddToCart}
            onLearnMore={handleLearnMore}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Catalog;
