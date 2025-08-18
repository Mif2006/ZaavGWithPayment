"use client"

import { useState, useEffect } from 'react';
import { fetchCatalogData, transformProductData, ProductData } from "@/lib/actions/catalog.actions"

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  sizes: Record<string, number>; // size -> quantity available
  isNew: boolean;
  collection: string | null;
  backImages: string[];
}

export const useCatalogData = () => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCatalogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const rawData = await fetchCatalogData();
        const transformedData = rawData.map(transformProductData);
        
        setItems(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load catalog data');
        console.error('Error loading catalog data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogData();
  }, []);

  const refetch = () => {
    const loadCatalogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const rawData = await fetchCatalogData();
        const transformedData = rawData.map(transformProductData);
        
        setItems(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load catalog data');
        console.error('Error loading catalog data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCatalogData();
  };

  return { items, loading, error, refetch };
};