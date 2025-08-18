// components/catalog/CatalogContent.tsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Catalog from '../Catalog';
import type { ProductData } from '@/lib/actions/catalog.actions';

// Transform ProductData to CatalogItem format
const transformToCatalogItem = (item: ProductData) => ({
  id: `product-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
  name: item.name,
  price: parseInt(item.price),
  description: `Beautiful ${item.type} from our collection`,
  imageUrl: item.imgLink,
  category: item.type,
  sizes: {}, // You'll need to implement size parsing if needed
  isNew: item.newItem === 'TRUE',
  collection: item.collection !== 'FALSE' ? item.collection : null,
  backImages: [] // You'll need to implement back images parsing if needed
});

interface CatalogContentProps {
  items: ProductData[];
  onItemClick: (item: any) => void;
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  showSizeModal: boolean;
  setShowSizeModal: (show: boolean) => void;
}

const CatalogContent: React.FC<CatalogContentProps> = ({
  items,
  onItemClick,
  selectedProduct,
  setSelectedProduct,
  showSizeModal,
  setShowSizeModal
}) => {
  // Transform ProductData items to CatalogItem format
  const catalogItems = items.map(transformToCatalogItem);

  return (
    <AnimatePresence mode="wait">
      <Catalog
        items={catalogItems}
        onItemClick={onItemClick}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        showSizeModal={showSizeModal}
        setShowSizeModal={setShowSizeModal}
      />
    </AnimatePresence>
  );
};

export default CatalogContent;