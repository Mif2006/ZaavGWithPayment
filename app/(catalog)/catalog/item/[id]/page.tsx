// app/catalog/item/[id]/page.tsx
"use client"

import React from 'react';
import { useCatalog } from '@/lib/context/ProductContext';
import Image from 'next/image';

const ProductDetail = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { getProductByName } = useCatalog();
  
  const decodedProductName = decodeURIComponent(id);
  const product = getProductByName(decodedProductName);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
      <h1>{product.sizes}</h1>
      <h1>{product.backImages}</h1>
      <Image
        src={product.imgLink}
        width={200}
        height={200}
        alt='mainImage'
      />
      {/* Display all product details */}
    </div>
  );
};

export default ProductDetail;