// components/catalog/CatalogHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';

const CatalogHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark text-dark-text mb-4">
        Zaavg Collection
      </h1>
      <p className="text-gray-600 text-dark-muted max-w-2xl mx-auto">
        Explore our unique collection of handcrafted jewelry. Each piece is designed with modern aesthetics and exceptional quality.
      </p>
    </motion.div>
  );
};

export default CatalogHeader;