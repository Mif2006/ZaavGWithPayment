"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import CatalogCard from "./CatalogCard";
import { fetchCatalogData } from "@/lib/actions/catalog.actions";
import type { CatalogItem } from "@/lib/hooks/useCatalogData";
import type { ProductData } from "@/lib/actions/catalog.actions";

const Bestsellers: React.FC = () => {
  const [products, setProducts] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data: ProductData[] = await fetchCatalogData();

        // Map ProductData -> CatalogItem
        const mappedData: CatalogItem[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description ?? "",
          imageUrl: item.imgLink || item.imageUrl || "/placeholder.png",
          category: item.category ?? "Uncategorized",
          sizes: item.sizes || {},
          isNew: item.isNew ?? false,
          collection: item.collection ?? null,
          backImages: item.backImages ?? [],
        }));

        // Filter: take first 12 "new" ones
        const bestsellers = mappedData.filter((item) => item.isNew).slice(0, 12);

        setProducts(bestsellers);
      } catch (err) {
        console.error("Error fetching catalog data:", err);
        setError("Failed to load bestsellers");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
          <p className="text-gray-200">Загрузка бестселлеров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <section className="relative w-full py-24 bg-transparent">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center font-serif text-4xl md:text-5xl text-white mb-16 tracking-wide drop-shadow-lg"
        >
          Наши <span className="text-purple-400">бестселлеры</span>
        </motion.h2>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {products.map((item, index) => (
            <CatalogCard
              key={item.id || index}
              item={item}
              index={index}
              onItemClick={() => {}}
              onAddToCart={() => {}}
              onLearnMore={() => {}}
              onToggleWishlist={() => {}}
              wishlist={[]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Bestsellers;
