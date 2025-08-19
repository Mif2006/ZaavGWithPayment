// import React from 'react'

// const ProductDetailPage = () => {
//   return (
//     <div>ProductDetailPage</div>
//   )
// }

// export default ProductDetailPage

// // components/product/ProductDetailPage.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, ShoppingCart, Share2, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

import SizeButton from '@/components/SizeButton';
import type { CatalogItem } from '@/lib/actions/catalog.actions';
import { useCatalog } from '@/lib/context/ProductContext';

interface ProductDetailPageProps {
  productId: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
console.log(productId)
  const router = useRouter();
  const { products } = useCatalog();
  console.log(products)
  
  // Fallback to fetch by ID if context is empty (for direct visits)
  const [product, setProduct] = useState<CatalogItem | null>();
  

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  // Combine main image with back images for carousel
  const allImages = [product.imageUrl, ...product.backImages];
  
  // Set default size to first available size
  useEffect(() => {
    const availableSizes = Object.entries(product.sizes).filter(([_, qty]) => qty > 0);
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0][0]);
    }
  }, [product.sizes, selectedSize]);

  const animateToImage = (newIndex: number, direction: 'left' | 'right') => {
    if (isAnimating || newIndex === currentImageIndex) return;
    
    setIsAnimating(true);
    
    const currentImg = currentImageRef.current;
    const nextImg = nextImageRef.current;
    const container = imageContainerRef.current;
    
    if (!currentImg || !nextImg || !container) {
      setCurrentImageIndex(newIndex);
      setIsAnimating(false);
      return;
    }
    
    // Set up the next image
    nextImg.src = allImages[newIndex];
    nextImg.style.display = 'block';
    
    // Position the next image based on direction
    const startX = direction === 'right' ? '100%' : '-100%';
    const endX = direction === 'right' ? '-100%' : '100%';
    
    gsap.set(nextImg, { x: startX, opacity: 1 });
    
    // Create timeline for smooth animation
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentImageIndex(newIndex);
        setIsAnimating(false);
        // Reset positions
        gsap.set(currentImg, { x: '0%', opacity: 1 });
        gsap.set(nextImg, { x: '0%', opacity: 0, display: 'none' });
      }
    });
    
    // Animate both images simultaneously
    tl.to(currentImg, {
      x: endX,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0)
    .to(nextImg, {
      x: '0%',
      duration: 0.6,
      ease: "power2.inOut"
    }, 0);
  };

  const nextImage = () => {
    if (allImages.length <= 1) return;
    const newIndex = (currentImageIndex + 1) % allImages.length;
    animateToImage(newIndex, 'right');
  };

  const prevImage = () => {
    if (allImages.length <= 1) return;
    const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    animateToImage(newIndex, 'left');
  };

  const goToImage = (index: number) => {
    if (index === currentImageIndex || isAnimating) return;
    const direction = index > currentImageIndex ? 'right' : 'left';
    animateToImage(index, direction);
  };

  const handleAddToCart = () => {
    if (Object.keys(product.sizes).length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // You'll need to implement cart functionality
    console.log('Add to cart:', { product, quantity, selectedSize });
  };

  const toggleWishlist = () => {
    // You'll need to implement wishlist functionality
    console.log('Toggle wishlist:', product);
  };

  const isOutOfStock = Object.keys(product.sizes).length > 0 && Object.values(product.sizes).every(qty => qty === 0);
  const selectedSizeStock = selectedSize ? product.sizes[selectedSize] || 0 : 0;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="relative z-10 flex items-center space-x-2 text-dark-muted hover:text-purple-500 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Catalog</span>
        </motion.button>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image Display */}
            <div 
              ref={imageContainerRef}
              className="relative aspect-square bg-white bg-dark-card rounded-2xl overflow-hidden shadow-elegant shadow-dark-elegant border-2 border-purple-300/60 dark:border-purple-400/60"
              style={{
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Current Image */}
              <img
                ref={currentImageRef}
                src={allImages[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
              
              {/* Next Image (hidden by default, used for transitions) */}
              <img
                ref={nextImageRef}
                alt="Next image"
                className="absolute inset-0 w-full h-full object-cover opacity-0"
                style={{ display: 'none' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
              
              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={isAnimating}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-dark-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  >
                    <ChevronLeft size={24} className="text-gray-700 dark:text-dark-text" />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={isAnimating}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-dark-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-card transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  >
                    <ChevronRight size={24} className="text-gray-700 dark:text-dark-text" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full z-10">
                  <span className="text-white text-sm">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
                {product.isNew && (
                  <div className="px-3 py-1 bg-purple-gradient rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium text-center">New</span>
                  </div>
                )}
                {product.collection && (
                  <div className="px-3 py-1 bg-dark-card/90 backdrop-blur-sm rounded-full">
                    <span className="text-xs text-purple-500 dark:text-purple-400 font-medium capitalize">
                      {product.collection}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    disabled={isAnimating}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-purple-500 dark:border-purple-400 shadow-lg'
                        : 'border-purple-200/60 dark:border-purple-400/40 hover:border-purple-400/80 dark:hover:border-purple-400/80'
                    } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title and Price */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-jewelry-dark dark:text-dark-text mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-serif text-purple-500 dark:text-purple-400">
                  ₽{product.price.toLocaleString()}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 dark:text-dark-muted ml-2">(4.8)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray dark:prose-invert">
              <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                {product.description || `Experience the perfect blend of modern design and timeless elegance with this exquisite ${product.category}. Crafted with meticulous attention to detail, this piece represents the pinnacle of contemporary jewelry artistry. Each element has been carefully considered to create a harmonious balance between sophistication and wearability.`}
              </p>
            </div>

            {/* Size Selection */}
            {Object.keys(product.sizes).length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-jewelry-dark dark:text-dark-text mb-3">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(product.sizes).map(([size, stock]) => (
                    <SizeButton
                      key={size}
                      size={size}
                      stock={stock}
                      isSelected={selectedSize === size}
                      onSelect={() => setSelectedSize(size)}
                      className="min-w-[80px]"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-medium text-jewelry-dark dark:text-dark-text mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-200 dark:border-dark-accent rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="px-4 py-2 text-jewelry-dark dark:text-dark-text font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedSizeStock || 10, quantity + 1))}
                    disabled={quantity >= selectedSizeStock && selectedSizeStock > 0}
                    className="p-2 hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                {selectedSize && selectedSizeStock > 0 && (
                  <span className="text-sm text-gray-500 dark:text-dark-muted">
                    {selectedSizeStock} available
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || (Object.keys(product.sizes).length > 0 && selectedSizeStock === 0)}
                  className="flex-1 py-4 bg-purple-gradient rounded-xl text-white font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  <span>
                    {isOutOfStock || (Object.keys(product.sizes).length > 0 && selectedSizeStock === 0)
                      ? 'Out of Stock'
                      : 'Add to Cart'
                    }
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleWishlist}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    false
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
                      : 'border-gray-200 dark:border-dark-accent hover:border-purple-500 dark:hover:border-purple-400 text-gray-500 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
                >
                  <Heart size={20} className={false ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-xl border-2 border-gray-200 dark:border-dark-accent hover:border-purple-500 dark:hover:border-purple-400 text-gray-500 dark:text-dark-muted hover:text-purple-500 dark:hover:text-purple-400 transition-all"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-xl p-6 shadow-elegant dark:shadow-dark-elegant"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-medium text-jewelry-dark dark:text-dark-text mb-4">
                Product Features
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-dark-muted">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Handcrafted with precision</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Lifetime warranty included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Free worldwide shipping</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

