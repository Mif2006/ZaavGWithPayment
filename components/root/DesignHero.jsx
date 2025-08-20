"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MoveLeft, MoveRight, MoveUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const videos = ["/videos/1012.mov", "/videos/1013.mov", "/videos/1012.mov"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // GSAP animation to slide videos in and out
  const animateVideo = (direction) => {
    const nextIndex = direction === 'left'
      ? (currentIndex === 0 ? videos.length - 1 : currentIndex - 1)
      : (currentIndex === videos.length - 1 ? 0 : currentIndex + 1);

    // Slide out the current video
    gsap.to(videoRef.current, {
      x: direction === 'left' ? '100%' : '-100%',
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        videoRef.current.pause();
        setCurrentIndex(nextIndex);
        gsap.fromTo(
          videoRef.current,
          { x: direction === 'left' ? '-100%' : '100%' },
          { x: '0%', duration: 0.7, ease: 'power2.inOut', onComplete: () => videoRef.current.play() }
        );
      }
    });
  };

  useEffect(() => {
    gsap.set(videoRef.current, { x: '0%' });
    videoRef.current.play();
  }, []);

  const handleMoveLeft = () => animateVideo('left');
  const handleMoveRight = () => animateVideo('right');

  return (
    <div className="w-screen px-2 min-h-screen h-[120vh] flex items-center justify-center pt-[8vh]">
      <div className="w-full flex flex-row gap-2 items-center">
        <div className="flex flex-col w-[50vw] gap-2 pt-[2px]">
          <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row lg:justify-between w-[50vw] h-auto min-h-[35vh] rounded-[37px] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20 animate-pulse"></div>
            
            {/* Subtle geometric pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
            </div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col gap-4 md:gap-6 flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px] text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-500 font-semibold leading-tight">
                  Авторские Украшения с Острова Бали
                </h1>
                <div className="flex flex-row items-center gap-2 lg:gap-0">
                  <button className="rounded-full bg-black text-white px-4 py-2 sm:px-6 sm:py-3 md:h-[60px] md:w-[160px] text-sm md:text-base transition-transform duration-500 hover:scale-105 whitespace-nowrap">
                    В Каталог
                  </button>
                  <div className="rounded-full cursor-pointer text-white flex items-center justify-center h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] md:h-[6vh] md:w-[6vh] bg-black transition-transform duration-500 hover:scale-105">
                    <MoveUpRight />
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Украшения, заряженные энергетикой чудо-острова. Уникальный дизайн со смыслом. Доставка по всему миру.
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="relative h-[55vh] w-[25vw] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-[27px] overflow-hidden group">
              {/* Integrated hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-400/0 to-purple-600/0 group-hover:from-purple-500/20 group-hover:via-purple-400/10 group-hover:to-purple-600/30 transition-all duration-700 ease-out"></div>
              
              {/* Organic light sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-conic from-transparent via-white/15 to-transparent animate-spin-slow opacity-30"></div>
                </div>
              </div>
              
              {/* Subtle particle effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300/60 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <img alt="image2" src="shop.jpg" width={800} height={800} className="h-[80%] w-full object-cover object-center rounded-[27px]" />
              <div className="relative z-10 flex justify-between h-[20%] px-[12px] items-center">
                
                <h3 className="font-semibold text-[20px]">Наш Магазин</h3>
               
                <a href='https://yandex.by/maps/org/zaav_g/76673064389/?ll=37.631595%2C55.741181&utm_source=share&z=16'>
                <div className="rounded-full cursor-pointer text-white flex items-center justify-center h-[6vh] w-[6vh] bg-black transition-transform duration-500 hover:scale-105">
                  <MoveUpRight />
                </div>
                </a>
              </div>
            </div>

            <div className="relative h-[55vh] w-[25vw] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-[27px] overflow-hidden group">
              {/* Integrated hover effects */}
              <div className="absolute inset-0 bg-gradient-to-tl from-indigo-500/0 via-indigo-400/0 to-indigo-600/0 group-hover:from-indigo-500/25 group-hover:via-indigo-400/10 group-hover:to-indigo-600/20 transition-all duration-700 ease-out"></div>
              
              {/* Flowing energy effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              </div>
              
              {/* Ambient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-300/15 rounded-full blur-lg"></div>
              </div>
              
              <img src="IMG_4805.jpg"  alt="shop" width={800} height={800} className="h-[80%] w-full object-cover object-center rounded-[27px]" />
              <div className="relative z-10 flex justify-between h-[20%] px-[12px] items-center">
                <h3 className="font-semibold text-[20px]">Новинки</h3>
                <a href='/catalogue'>
                <div className="rounded-full cursor-pointer text-white flex items-center justify-center h-[6vh] w-[6vh] bg-black transition-transform duration-500 hover:scale-105">
                  <MoveUpRight />
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-[50vw] h-[90vh] rounded-[37px] bg-gray-900 overflow-hidden">
          <video
            ref={videoRef}
            src={videos[currentIndex]}
            className="object-cover absolute w-full h-full inset-0 rounded-[37px]"
            autoPlay
            muted
            loop
          />

          <div className="absolute px-[12px] flex justify-between bottom-0 left-0 right-0 h-16 border-t border-transparent">
            <div className="rounded-full text-white flex items-center justify-center h-[6vh] w-[6vh] bg-gray-900 opacity-0"></div>
            <div className="flex flex-row gap-1">
              <div
                className="rounded-full text-white cursor-pointer flex items-center justify-center h-[6vh] w-[6vh] bg-gray-900 transition-transform duration-500 hover:scale-105"
                onClick={handleMoveLeft}
              >
                <MoveLeft />
              </div>
              <div
                className="rounded-full text-white cursor-pointer flex items-center justify-center h-[6vh] w-[6vh] bg-gray-900 transition-transform duration-500 hover:scale-105"
                onClick={handleMoveRight}
              >
                <MoveRight />
              </div>
            </div>
            <div className="rounded-full text-white cursor-pointer flex items-center justify-center h-[6vh] w-[6vh] bg-gray-900 transition-transform duration-500 hover:scale-105">
              <MoveUpRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
