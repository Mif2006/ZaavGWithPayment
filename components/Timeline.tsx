"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Purchase } from '@/lib/types/types';

interface TimelineProps {
  purchases: Purchase[];
  darkMode: boolean;
}

const Timeline: React.FC<TimelineProps> = ({ purchases, darkMode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Constants for the wave and positioning calculations
  const cardWidth = 140; // Reduced default card width
  const cardHeight = 140; // Reduced default card height
  const svgHeight = 840; // 1.5x taller SVG height
  const waveAmplitude = 80; // Base wave amplitude
  const spaceBetweenCards = 140; // Halved space between cards to match every peak/trough
  // Massive increase to SVG width to ensure it extends well beyond viewport
  const svgWidth = Math.max(purchases.length * spaceBetweenCards * 10, 10000);
  const middleY = svgHeight / 2; // Center line of the wave
  const peakInterval = spaceBetweenCards; // Each card gets its own peak/trough
  
  // Responsive amplitude adjustment
  const getResponsiveAmplitude = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 40 : waveAmplitude;
    }
    return waveAmplitude;
  };
  
  const [responsiveAmplitude, setResponsiveAmplitude] = useState(getResponsiveAmplitude());
  
  useEffect(() => {
    const handleResize = () => {
      setResponsiveAmplitude(getResponsiveAmplitude());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate all peak points on the curve (including between purchase points)
  const generateAllPeakPoints = () => {
    const peakPoints = [];
    const totalPoints = Math.ceil(svgWidth / peakInterval) + 1;
    
    for (let i = 0; i < totalPoints; i++) {
      const x = i * peakInterval;
      
      // If i is even, it's a peak (top). If odd, it's a trough (bottom)
      const isTop = i % 2 === 0;
      const y = isTop 
        ? middleY - responsiveAmplitude // Peak
        : middleY + responsiveAmplitude; // Trough
      
      peakPoints.push({ x, y, isTop });
    }
    
    return peakPoints;
  };
  
  // Pre-calculate positions specifically for purchase cards
  const generateCardPositions = () => {
    const positions = [];
    
    for (let i = 0; i < purchases.length; i++) {
      // Calculate x position (centered within each segment)
      const x = i * spaceBetweenCards;
      
      // Alternate between peaks and troughs
      const isTop = i % 2 === 0;
      const y = isTop 
        ? middleY - responsiveAmplitude // Peak
        : middleY + responsiveAmplitude; // Trough
      
      positions.push({ x, y, isTop });
    }
    
    return positions;
  };
  
  // Generate SVG path for the curved line that perfectly matches all peak positions
  const generateWavyPath = () => {
    const points = [];
    const totalWidth = svgWidth;
    
    // Create a higher resolution curve with more points
    const numPoints = totalWidth * 4; // Quadruple the points for smoother curve
    const step = totalWidth / numPoints;
    
    for (let i = 0; i <= numPoints; i++) {
      const x = i * step;
      
      const frequency = Math.PI / peakInterval;
      const phaseOffset = -Math.PI / 2; // Start at peak
      const y = middleY + responsiveAmplitude * Math.sin(frequency * x + phaseOffset);
      
      points.push(`${x},${y}`);
    }
    
    return `M${points.join(' L')}`;
  };

  const allPeakPoints = generateAllPeakPoints();
  const cardPositions = generateCardPositions();
  const wavyPath = generateWavyPath();

  // Get the stroke color based on dark mode
  const strokeColor = darkMode ? '#9333EA' : '#8B5CF6';
  const dotFill = darkMode ? '#1E1E1E' : 'white';
  const dotStroke = darkMode ? '#9333EA' : '#8B5CF6';
  
  // Grid settings
  const gridColor = darkMode ? 'rgba(147, 51, 234, 0.3)' : 'rgba(139, 92, 246, 0.25)'; 
  const gridSpacing = 25; // Grid spacing

  return (
    <div className="relative">
      {/* Full Container Grid Background - This overlay covers the entire container */}
      <div 
        className="absolute inset-0 z-0 rounded-2xl overflow-hidden"
        style={{ 
          backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          boxShadow: darkMode 
            ? 'inset 0 0 50px rgba(147, 51, 234, 0.5)' 
            : 'inset 0 0 50px rgba(139, 92, 246, 0.5)',
          animation: 'pulse 3s infinite alternate'
        }}
      />
      
      {/* Semi-transparent overlay for visual depth */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900/10 to-purple-800/30 dark:from-purple-900/20 dark:to-purple-800/40 rounded-2xl"
        style={{
          backdropFilter: 'blur(1px)',
          animation: 'fadeIn 1s ease-in-out forwards'
        }}
      />
      
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-accent shadow-elegant dark:shadow-dark-elegant rounded-full p-1.5 md:p-2 text-jewelry-dark dark:text-dark-text transition-colors duration-300"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>
      
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-dark-accent shadow-elegant dark:shadow-dark-elegant rounded-full p-1.5 md:p-2 text-jewelry-dark dark:text-dark-text transition-colors duration-300"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>
      
      <div 
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar py-2 pl-[140px] pr-4 relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Ensure timeline container is large enough */}
        <motion.div 
          className="relative w-max timeline-container" 
          style={{ height: '810px', minWidth: 'calc(100% + 140px)' }}
          drag="x"
          dragControls={dragControls}
          dragConstraints={scrollRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={(e, info) => {
            if (scrollRef.current) {
              scrollRef.current.scrollLeft -= info.delta.x;
            }
          }}
        >
          {/* Timeline wavy line - full container top to bottom */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Full-height grid background for entire container */}
            <div 
              className="absolute inset-0 z-0 rounded-xl overflow-hidden"
              style={{ 
                boxShadow: darkMode 
                  ? 'inset 0 0 50px rgba(147, 51, 234, 0.4)' 
                  : 'inset 0 0 50px rgba(139, 92, 246, 0.4)',
              }}
            >
              <div 
                className="absolute inset-0 grid-background"
                style={{
                  backgroundSize: `${gridSpacing}px ${gridSpacing}px`,
                  backgroundImage: `
                    linear-gradient(to right, ${gridColor} 1px, transparent 1px),
                    linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
                  `,
                  animation: 'pulse 3s infinite alternate',
                }}
              />
            </div>
            
            {/* Massive SVG that extends well beyond the visible area */}
            <svg 
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="xMinYMid slice"
              className="relative z-10"
              style={{ 
                overflow: 'visible', // Allow path to extend beyond svg bounds
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '100%', // Make sure it fills horizontally
              }} 
            >
              {/* Define glow filter */}
              <defs>
                <filter id="grid-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feFlood floodColor={darkMode ? '#9333EA' : '#8B5CF6'} floodOpacity="0.3" result="flood" />
                  <feComposite in="flood" in2="SourceGraphic" operator="in" result="colored" />
                  <feGaussianBlur in="colored" stdDeviation="4" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="1.5" intercept="0" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feFlood floodColor={darkMode ? '#9333EA' : '#8B5CF6'} floodOpacity="0.6" result="flood" />
                  <feComposite in="flood" in2="SourceGraphic" operator="in" result="colored" />
                  <feGaussianBlur in="colored" stdDeviation="3" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="1.5" intercept="0" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <linearGradient id="lightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
                
                <linearGradient id="darkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9333EA" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#581C87" stopOpacity="0.2" />
                </linearGradient>
                
                <pattern id="gridPattern" x="0" y="0" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
                  <path 
                    d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} 
                    fill="none" 
                    stroke={gridColor} 
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              
              {/* Background rectangle with gradient - full width */}
              <rect 
                x="0" 
                y="0" 
                width={svgWidth}
                height={svgHeight} 
                fill={darkMode ? 'url(#darkGradient)' : 'url(#lightGradient)'} 
                opacity="0.3"
              />
              
              {/* Grid overlay - full width */}
              <rect 
                x="0" 
                y="0" 
                width={svgWidth}
                height={svgHeight} 
                fill="url(#gridPattern)" 
                className="grid-overlay"
                filter="url(#grid-glow)"
              />
              
              {/* Wavy path line - ensure it extends fully */}
              <path 
                d={wavyPath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="3"
                filter="url(#line-glow)"
                className="wavy-path"
                strokeLinecap="round"
                strokeDasharray="none" // Ensure solid line
              />
              
              {/* Add points at all peaks and troughs - limit to first 20 for performance */}
              {allPeakPoints.slice(0, 20).map((point, index) => (
                <motion.circle 
                  key={`peak-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={dotFill}
                  stroke={dotStroke}
                  strokeWidth="2"
                  filter="url(#grid-glow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.05 + 0.5,
                    type: "spring", 
                    stiffness: 500,
                    damping: 15
                  }}
                />
              ))}
            </svg>
          </div>
          
          <div className="flex relative z-10">
            {purchases.map((purchase, index) => {
              const { x, y, isTop } = cardPositions[index];
              
              return (
                <div 
                  key={purchase.id}
                  className="relative"
                  style={{ 
                    width: `${spaceBetweenCards}px`,
                    height: '100%',
                  }}
                >
                  {/* Card - Positioned directly above/below the dot */}
                  <motion.div 
                    initial={{ opacity: 0, y: isTop ? 50 : -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2, 
                      zIndex: 30,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      y: isTop ? -10 : 10,
                      transition: { 
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 1,
                        duration: 0.4
                      }
                    }}
                    className="bg-white dark:bg-dark-card shadow-card dark:shadow-dark-card rounded-xl overflow-hidden absolute z-10 transition-all duration-500 ease-out"
                    style={{
                      width: `${cardWidth}px`,
                      // Center the card directly above or below the dot:
                      left: `${-cardWidth/2}px`, // Center on the dot
                      // Position cards exactly at the wave peaks and troughs
                      top: `${y + (isTop ? -cardHeight - 47 : (window.innerWidth < 640 ? -cardHeight - 20 : 0))}px`,
                      transformOrigin: isTop ? 'bottom center' : 'top center'
                    }}
                  >
                    <div className="h-24 md:h-28 w-full overflow-hidden">
                      <img 
                        src={purchase.imageUrl} 
                        alt={purchase.name}
                        className="h-full w-full object-cover transition-all duration-700 ease-out hover:scale-110 hover:rotate-1"
                      />
                    </div>
                    <div className="p-2 md:p-3">
                      <h3 className="font-serif text-xs md:text-sm text-jewelry-dark dark:text-dark-text line-clamp-1 transition-colors duration-300">{purchase.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-purple-500 dark:text-purple-300 font-medium text-xs transition-colors duration-300">${purchase.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 dark:text-dark-muted transition-colors duration-300">{purchase.size}</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-dark-muted mt-0.5 transition-colors duration-300">
                        {format(new Date(purchase.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Larger points for purchase positions */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1 + 0.3,
                      type: "spring", 
                      stiffness: 500,
                      damping: 15
                    }}
                    className="w-8 h-8 rounded-full border-2 border-purple-500 dark:border-purple-400 bg-white dark:bg-dark-card z-20 absolute transition-colors duration-300 flex items-center justify-center"
                    style={{ 
                      left: `${-16}px`, // Center circle (half of 32px width)
                      top: `${y - 16}px`, // Position exactly on the curve (half the height)
                      boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                    }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline;