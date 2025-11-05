"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveLeft, MoveRight, MoveUpRight } from "lucide-react";
import { gsap } from "gsap";

const Hero = () => {
  const videos = ["/videos/1013.mov", "/videos/1013.mov", "/videos/1013.mov"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Animate between videos
  const animateVideo = (direction: "left" | "right") => {
    const nextIndex =
      direction === "left"
        ? currentIndex === 0
          ? videos.length - 1
          : currentIndex - 1
        : currentIndex === videos.length - 1
        ? 0
        : currentIndex + 1;

    const current = videoRefs.current[currentIndex];
    const next = videoRefs.current[nextIndex];

    if (!current || !next) return;

    // Prepare next video position
    gsap.set(next, {
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
      zIndex: 2,
    });
    gsap.set(current, { zIndex: 1 });

    // Animate current out
    gsap.to(current, {
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    });

    // Animate next in
    gsap.to(next, {
      x: "0%",
      opacity: 1,
      duration: 0.7,
      ease: "power2.inOut",
      onStart: () => next.play(),
      onComplete: () => setCurrentIndex(nextIndex),
    });
  };

  useEffect(() => {
    // Initialize: show only the first video
    videos.forEach((_, i) => {
      if (videoRefs.current[i]) {
        gsap.set(videoRefs.current[i], {
          x: "0%",
          opacity: i === 0 ? 1 : 0,
        });
        if (i === 0) videoRefs.current[i]?.play();
      }
    });
  }, []);

  const handleMoveLeft = () => animateVideo("left");
  const handleMoveRight = () => animateVideo("right");

  return (
    <div className="w-screen px-2 min-h-screen h-[120vh] flex items-center justify-center pt-[8vh]">
      <div className="w-full flex flex-row gap-2 items-center">
        {/* Left column */}
        <div className="flex flex-col w-[50vw] gap-2 pt-[2px]">
          <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row lg:justify-between 
              w-[50vw] h-auto min-h-[35vh] rounded-[37px] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 
              bg-gray-400 will-change-transform backface-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
            </div>

            {/* Text content */}
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
                Украшения, заряженные энергетикой чудо-острова. Уникальный дизайн
                со смыслом. Доставка по всему миру.
              </p>
            </div>
          </div>

          {/* Two cards below */}
          <div className="flex flex-row gap-2">
            <div className="relative h-[55vh] w-[25vw] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-gray-400 rounded-[27px] overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300/60 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-500"></div>
              </div>
              <img
                alt="image2"
                src="shop.jpg"
                className="h-[80%] w-full object-cover object-center rounded-[27px] will-change-transform backface-hidden bg-gray-300"
              />
              <div className="relative z-10 flex justify-between h-[20%] px-[12px] items-center">
                <h3 className="font-semibold text-[20px]">Наш Магазин</h3>
                <a href="https://yandex.by/maps/org/zaav_g/76673064389/?ll=37.631595%2C55.741181&utm_source=share&z=16">
                  <div className="rounded-full cursor-pointer text-white flex items-center justify-center h-[6vh] w-[6vh] bg-black transition-transform duration-500 hover:scale-105">
                    <MoveUpRight />
                  </div>
                </a>
              </div>
            </div>

            <div className="relative h-[55vh] w-[25vw] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-gray-400 rounded-[27px] overflow-hidden group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-300/15 rounded-full blur-lg"></div> */}
              </div>
              <img
                src="IMG_4805.jpg"
                alt="shop"
                className="h-[80%] w-full object-cover object-center rounded-[27px] will-change-transform backface-hidden bg-gray-300"
              />
              <div className="relative z-10 flex justify-between h-[20%] px-[12px] items-center">
                <h3 className="font-semibold text-[20px]">Новинки</h3>
                <a href="/catalog">
                  <div className="rounded-full cursor-pointer text-white flex items-center justify-center h-[6vh] w-[6vh] bg-black transition-transform duration-500 hover:scale-105">
                    <MoveUpRight />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right column (video carousel) */}
       {/* Right column (video carousel) */}
<div className="relative w-[50vw] h-[90vh] isolation-isolate ">
  {/* Gradient background on its own layer */}

  {/* Video layer */}
  {videos.map((video, index) => (
    <video
      key={index}
      ref={(el) => {
        videoRefs.current[index] = el;
      }}
      src={video}
      className="absolute inset-0 w-full h-full object-cover  bg-black will-change-transform"
      autoPlay
      muted
      loop
    />
  ))}

  {/* Controls */}
  <div className="absolute px-[12px] z-[50] flex justify-between bottom-0 left-0 right-0 h-16 border-t border-transparent">
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
