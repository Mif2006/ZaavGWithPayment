// app/catalog/layout.tsx
"use client"

import { CatalogProvider } from "@/lib/context/ProductContext";
import { ProductData } from '@/lib/actions/catalog.actions';
import { fetchCatalogData } from '@/lib/actions/catalog.actions';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCatalogData();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching catalog data:', err);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{backgroundImage: "url(/purple2.jpeg)"}} className="min-h-screen bg-cover bg-center flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <p className="text-white">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <CatalogProvider initialProducts={products}>
      {children}
    </CatalogProvider>
  );
}