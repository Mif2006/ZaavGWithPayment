// app/catalog/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, Search, X } from 'lucide-react';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import CatalogFilters from '@/components/catalog/CatalogFilters';
import CatalogContent from '@/components/catalog/CatalogContent';
import CatalogStatusBar from '@/components/catalog/CatalogStatusBar';
import { useCatalog } from '@/lib/context/ProductContext'; // Import context
import type { ProductData } from '@/lib/actions/catalog.actions';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'new', name: 'New Arrivals' },
  { id: 'rings', name: 'Rings' },
  { id: 'falange', name: 'Falange Rings' },
  { id: 'bracelets', name: 'Bracelets' },
  { id: 'chains', name: 'Chains' },
  { id: 'mens', name: 'Mens Wear' },
  { id: 'pendants', name: 'Pendants' },
  { id: 'earrings', name: 'Earrings' },
];

export default function CatalogPage() {
  const { products, loading, error } = useCatalog(); // Get data from context
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [activeCollection, setActiveCollection] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const [selectedProductForSize, setSelectedProductForSize] = React.useState<any>(null);
  const [showSizeModal, setShowSizeModal] = React.useState(false);

  // Use context data instead of local state
  const items = products;

  const collections = React.useMemo(() => {
    const uniqueCollections = [...new Set(items.filter(item => item.collection && item.collection !== 'FALSE').map(item => item.collection))];
    return uniqueCollections.filter(Boolean) as string[];
  }, [items]);

  const filteredItems = React.useMemo(() => {
    let filtered = items;
    
    // Filter by category
    if (activeCategory !== 'all') {
      if (activeCategory === 'new') {
        filtered = filtered.filter(item => item.newItem === 'TRUE');
      } else if (activeCategory === 'rings') {
        filtered = filtered.filter(item => item.type === 'ring');
      } else {
        filtered = filtered.filter(item => item.type === activeCategory);
      }
    }
    
    // Filter by collection
    if (activeCollection) {
      filtered = filtered.filter(item => item.collection === activeCollection);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.collection && item.collection.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [items, activeCategory, activeCollection, searchQuery]);

  const handleItemClick = (item: any) => {
    setSelectedProduct(item);
  };

  const handleCollectionClick = (collection: string) => {
    if (activeCollection === collection) {
      setActiveCollection(null);
    } else {
      setActiveCollection(collection);
    }
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveCollection(null);
    setSearchQuery('');
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const closeSizeModal = () => {
    setShowSizeModal(false);
    setSelectedProductForSize(null);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-purple-500 dark:text-purple-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-dark-muted">Loading catalog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load catalog</p>
            <p className="text-gray-600 dark:text-dark-muted mb-4 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()} // Simple refresh
              className="px-4 py-2 bg-purple-gradient rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/purple2.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  md:pt-[120px] py-8">
        <CatalogHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-card/20 backdrop-blur-xl border border-white/30 dark:border-white/30 shadow-2xl rounded-2xl p-4 md:p-6 mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <CatalogStatusBar
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            activeCollection={activeCollection}
            filteredItemsCount={filteredItems.length}
            categories={categories}
            refetch={() => window.location.reload()} // Simple refresh
            clearSearch={clearSearch}
            clearFilters={clearFilters}
            setActiveCategory={setActiveCategory}
            setActiveCollection={setActiveCollection}
          />
          
          <CatalogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            collections={collections}
            activeCollection={activeCollection}
            handleCollectionClick={handleCollectionClick}
          />
          
          <CatalogContent
            items={filteredItems}
            onItemClick={handleItemClick}
            selectedProduct={selectedProductForSize}
            setSelectedProduct={setSelectedProductForSize}
            showSizeModal={showSizeModal}
            setShowSizeModal={setShowSizeModal}
          />
        </motion.div>
      </div>
    </div>
  );
}