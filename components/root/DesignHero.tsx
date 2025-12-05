"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveLeft, MoveRight, MoveUpRight } from "lucide-react";
import { gsap } from "gsap";

const Hero = () => {
  const videos = ["/videos/1013.mov", "/videos/1013.mov", "/videos/1013.mov"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

    gsap.set(next, {
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
      zIndex: 2,
    });
    gsap.set(current, { zIndex: 1 });

    gsap.to(current, {
      x: direction === "left" ? "100%" : "-100%",
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    });

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
    <div className="w-screen min-h-screen h-[120vh] flex items-center justify-center pt-[8vh] px-2">
      <div className="w-full flex flex-col lg:flex-row gap-2 items-center">
        {/* Left side (text + 2 cards) */}
        <div className="flex flex-col w-full lg:w-[50vw] gap-2">
          {/* Text Card */}
          <div className="relative overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row lg:justify-between 
              w-full h-auto min-h-[35vh] rounded-[37px] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 
              bg-gray-400 will-change-transform backface-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 border border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
            </div>

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
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Card 1 */}
            <div className="relative h-[40vh] sm:h-[55vh] w-full sm:w-1/2 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-gray-400 rounded-[27px] overflow-hidden group">
              <img
                alt="image2"
                src="shop.jpg"
                className="h-[80%] w-full object-cover object-center rounded-[27px]"
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

            {/* Card 2 */}
            <div className="relative h-[40vh] sm:h-[55vh] w-full sm:w-1/2 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 bg-gray-400 rounded-[27px] overflow-hidden group">
              <img
                src="IMG_4805.jpg"
                alt="shop"
                className="h-[80%] w-full object-cover object-center rounded-[27px]"
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

        {/* Right column (video carousel) — hidden on mobile */}
        <div className="hidden lg:block relative w-[50vw] h-[90vh] isolation-isolate">
          {videos.map((video, index) => (
            <video
              key={index}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              autoPlay
              muted
              loop
            />
          ))}

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
