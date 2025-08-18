// components/catalog/CatalogFilters.tsx
import React from 'react';
import { Search, X } from 'lucide-react';

interface CatalogFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: { id: string; name: string }[];
  collections: string[];
  activeCollection: string | null;
  handleCollectionClick: (collection: string) => void;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  clearSearch,
  activeCategory,
  setActiveCategory,
  categories,
  collections,
  activeCollection,
  handleCollectionClick
}) => {
  return (
    <>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-300 dark:text-gray-300" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="block w-full pl-10 pr-10 py-3 border border-white/20 dark:border-white/20 rounded-xl bg-black/30 dark:bg-black/30 backdrop-blur-md text-white dark:text-white placeholder-gray-300 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400/50 dark:focus:ring-purple-400/50 focus:border-purple-400/70 dark:focus:border-purple-400/70 transition-all"
            style={{
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)'
            }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
            >
              <X className="h-5 w-5 text-gray-300 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-purple-gradient text-white'
              : 'bg-black/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/20 text-white dark:text-white hover:bg-black/40 dark:hover:bg-black/40'
          }`}
          style={activeCategory !== 'all' ? {
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)'
          } : {}}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-purple-gradient text-white'
                : 'bg-black/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/20 text-white dark:text-white hover:bg-black/40 dark:hover:bg-black/40'
            }`}
            style={activeCategory !== category.id ? {
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)'
            } : {}}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {collections.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white dark:text-white mb-2">Collections:</h3>
          <div className="flex flex-wrap gap-2">
            {collections.map(collection => (
              <button 
                key={collection} 
                onClick={() => handleCollectionClick(collection)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCollection === collection
                    ? 'bg-blue-500 text-white'
                    : 'bg-purple-500/30 backdrop-blur-md border border-purple-400/40 text-purple-200 dark:text-purple-200 hover:bg-purple-500/40'
                }`}
                style={activeCollection !== collection ? {
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)'
                } : {}}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogFilters;