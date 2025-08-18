// components/catalog/CatalogStatusBar.tsx
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface CatalogStatusBarProps {
  searchQuery: string;
  activeCategory: string;
  activeCollection: string | null;
  filteredItemsCount: number;
  categories: { id: string; name: string }[];
  refetch: () => void;
  clearSearch: () => void;
  clearFilters: () => void;
  setActiveCategory: (category: string) => void;
  setActiveCollection: (collection: string | null) => void;
}

const CatalogStatusBar: React.FC<CatalogStatusBarProps> = ({
  searchQuery,
  activeCategory,
  activeCollection,
  filteredItemsCount,
  categories,
  refetch,
  clearSearch,
  clearFilters,
  setActiveCategory,
  setActiveCollection
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <h2 className="text-xl font-serif text-white dark:text-white">
          {searchQuery 
            ? `Search Results`
            : activeCollection 
              ? `${activeCollection} Collection`
              : activeCategory === 'all' 
                ? 'All Items' 
                : categories.find(c => c.id === activeCategory)?.name || 'Items'
          }
          <span className="text-sm text-gray-300 dark:text-gray-300 ml-2">
            ({filteredItemsCount} items)
          </span>
        </h2>
        {searchQuery && (
          <p className="text-sm text-gray-300 dark:text-gray-300 mt-1">
            Searching for "{searchQuery}"
          </p>
        )}
      </div>
      <button
        onClick={refetch}
        className="p-2 hover:bg-white/20 dark:hover:bg-white/20 rounded-full transition-colors"
        title="Refresh catalog"
      >
        <RefreshCw className="w-4 h-4 text-white dark:text-white" />
      </button>
    </div>
  );
};

export default CatalogStatusBar;