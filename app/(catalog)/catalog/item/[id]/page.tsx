"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, ShoppingCart, Share2, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import SizeButton from '@/components/SizeButton';
import { useCatalog } from '@/lib/context/ProductContext';
import { parseSizes } from '@/lib/actions/catalog.actions';

const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = React.use(params);
  const { getProductByName } = useCatalog();
  const product = getProductByName(id);

  const parsedBackImages = React.useMemo(() => {
    if (!product?.backImages) return [];
    if (typeof product.backImages === 'string') {
      try {
        const cleanedString = product.backImages.trim().replace(/\s+/g, '');
        const parsed = JSON.parse(cleanedString);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error('Error parsing backImages:', error);
        return [];
      }
    }
    return Array.isArray(product.backImages) ? product.backImages : [];
  }, [product?.backImages]);

  const [parsedSizes, setParsedSizes] = useState<Record<string, number>>({});
  useEffect(() => {
    if (product?.sizes) {
      parseSizes(product.sizes).then(setParsedSizes);
    } else {
      setParsedSizes({});
    }
  }, [product?.sizes]);

  const allImages = product ? [product.imgLink, ...parsedBackImages] : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const nextImageRef = useRef<HTMLImageElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-300 dark:text-gray-300">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const availableSizes = Object.entries(parsedSizes).filter(([_, qty]) => qty > 0);
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0][0]);
      setQuantity(1);
    }
  }, [parsedSizes, selectedSize]);

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
    nextImg.src = allImages[newIndex];
    nextImg.style.display = 'block';
    const startX = direction === 'right' ? '100%' : '-100%';
    const endX = direction === 'right' ? '-100%' : '100%';
    gsap.set(nextImg, { x: startX, opacity: 1 });
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentImageIndex(newIndex);
        setIsAnimating(false);
        gsap.set(currentImg, { x: '0%', opacity: 1 });
        gsap.set(nextImg, { x: '0%', opacity: 0, display: 'none' });
      },
    });
    tl.to(currentImg, { x: endX, duration: 0.6, ease: 'power2.inOut' }, 0)
      .to(nextImg, { x: '0%', duration: 0.6, ease: 'power2.inOut' }, 0);
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
    if (Object.keys(parsedSizes).length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize || undefined,
      image: product.imgLink,
      quantity: quantity,
    };
    // Add to localStorage cart
    const success = addToLocalStorageCart(cartItem);
    if (success) {
      console.log('Add to cart:', { product, quantity, selectedSize });
    } else {
      alert('Failed to add item to cart');
    }
  };

  const addToLocalStorageCart = (item: any) => {
    try {
      const cartItemId = `${item.name}-${item.size || 'nosize'}-${Date.now()}`;
      const storedCart = localStorage.getItem('cart');
      let cartItems: any[] = storedCart ? JSON.parse(storedCart) : [];
      const existingItemIndex = cartItems.findIndex(
        (cartItem: any) => cartItem.id === cartItemId
      );
      if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += item.quantity;
      } else {
        cartItems.push({ ...item, id: cartItemId, quantity: item.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const toggleWishlist = () => {
    console.log('Toggle wishlist:', product);
  };

  const isOutOfStock = Object.keys(parsedSizes).length > 0 && Object.values(parsedSizes).every(qty => qty === 0);
  const selectedSizeStock = selectedSize ? parsedSizes[selectedSize] || 0 : 0;

  useEffect(() => {
    setQuantity(1);
  }, [selectedSize]);

  return (
    <div className="min-h-screen relative pt-[80px]">
      {/* Background Image */}
      <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(/purple2.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => router.back()} className="relative z-10 flex items-center space-x-2 text-white font-bold cursor-pointer hover:text-purple-300 transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Back to Catalog</span>
        </motion.button>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel - Left Side */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-4">
            {/* Main Image Display */}
            <div ref={imageContainerRef} className="relative aspect-square bg-white/10 dark:bg-white/10 rounded-2xl overflow-hidden shadow-lg border-2 border-white/30 backdrop-blur-sm" style={{ boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
              {/* Current Image */}
              <img
                ref={currentImageRef}
                src={allImages[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={openModal}
              />
            </div>
          </motion.div>

          {/* Full Screen Modal for Image */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="relative">
                <button onClick={closeModal} className="absolute top-4 right-4 text-white font-bold">Close</button>
                <img
                  src={allImages[currentImageIndex]}
                  alt="Zoomed Image"
                  className="max-w-full max-h-screen object-contain"
                  style={{ cursor: 'zoom-out' }}
                  onClick={closeModal}
                />
              </div>
            </div>
          )}

          {/* Product Details - Right Side */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-white dark:text-white mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-serif text-purple-300 dark:text-purple-300">₽{product.price?.toLocaleString() || '0'}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-300 fill-yellow-300" />
                  ))}
                  <span className="text-sm text-gray-300 dark:text-gray-300 ml-2">(4.8)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert">
              <p className="text-gray-300 dark:text-gray-200 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {Object.keys(parsedSizes).length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-white dark:text-white mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(parsedSizes).map(([size, stock]) => (
                    <SizeButton key={size} size={size} stock={stock} isSelected={selectedSize === size} onSelect={() => setSelectedSize(size)} className="min-w-[60px]" />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-medium text-white dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/30 dark:border-white/30 rounded-lg bg-white/10 backdrop-blur-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white/20 transition-colors">
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(selectedSizeStock, quantity + 1))} disabled={quantity >= selectedSizeStock || selectedSizeStock === 0} className="p-2 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart} disabled={isOutOfStock || (Object.keys(parsedSizes).length > 0 && selectedSizeStock === 0)} className="flex-1 py-4 bg-purple-gradient rounded-xl text-white font-medium text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                  <ShoppingCart size={20} />
                  <span>{isOutOfStock || (Object.keys(parsedSizes).length > 0 && selectedSizeStock === 0) ? 'Out of Stock' : 'Add to Cart'}</span>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleWishlist} className="p-4 rounded-xl border-2 border-white/30 hover:border-purple-300 text-white hover:text-purple-300 transition-all bg-white/10 backdrop-blur-sm">
                  <Heart size={20} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-4 rounded-xl border-2 border-white/30 hover:border-purple-300 text-white hover:text-purple-300 transition-all bg-white/10 backdrop-blur-sm">
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-white/10 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
              <h3 className="text-lg font-medium text-white dark:text-white mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-200 dark:text-gray-200">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Handcrafted with precision</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Lifetime warranty included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
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
