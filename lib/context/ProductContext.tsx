"use client"

// contexts/CatalogContext.tsx
import React, { createContext, useContext } from 'react';
import { ProductData } from '../actions/catalog.actions';

interface CatalogContextType {
  products: ProductData[];
  loading: boolean;
  error: string | null;
  getProductByName: (name: string) => ProductData | undefined;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

export const CatalogProvider: React.FC<{ 
  children: React.ReactNode; 
  initialProducts: ProductData[] 
}> = ({ children, initialProducts }) => {
  const getProductByName = (searchSlug: string) => {
    if (!initialProducts || !Array.isArray(initialProducts)) {
      return undefined;
    }
    
    const decodedSlug = decodeURIComponent(searchSlug);
    
    return initialProducts.find(product => {
      // Create slug from product name for comparison
      const productSlug = product.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
        
      // Create alternative versions
      const productNameNormalized = product.name.toLowerCase().replace(/\s+/g, ' ');
      const searchSlugNormalized = decodedSlug.toLowerCase().replace(/\s+/g, ' ');
      
      return (
        productSlug === decodedSlug.toLowerCase() ||
        productNameNormalized === searchSlugNormalized ||
        product.name.toLowerCase() === decodedSlug.toLowerCase().replace(/-/g, ' ')
      );
    });
  };

  return (
    <CatalogContext.Provider value={{ 
      products: initialProducts, 
      loading: false, 
      error: null, 
      getProductByName 
    }}>
      {children}
    </CatalogContext.Provider>
  );
};