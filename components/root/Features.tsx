"use client"

import { useGSAP } from '@gsap/react';
import React, { useRef, useEffect } from 'react';
import { animateWithGsap } from '@/lib/utils';
// import explore1Img from '../assets/images/IMG_4807.jpg';
// import explore2Img from '../assets/images/IMG_4800.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause pause reverse',
        start: '-10% bottom', // When 10% of the video enters the viewport from the bottom
        onEnter: () => {
          videoRef.current?.play(); // Start playing the video when it enters the viewport
        },
        onLeave: () => {
          videoRef.current?.pause(); // Pause the video when it leaves the viewport
        },
        onEnterBack: () => {
          videoRef.current?.play(); // Resume playing when re-entering
        },
        onLeaveBack: () => {
          videoRef.current?.pause(); // Pause again when scrolling back
        }
      }
    });

    // Animate elements on scroll
    animateWithGsap('#features_title', { y: 0, opacity: 1 });
    animateWithGsap(
      '.g_grow',
      {
        scale: 1,
        opacity: 1,
        ease: 'power1'
      },
      { scrub: 5.5 }
    );
    animateWithGsap('.g_text', { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 });
  }, []);

  return (
    <section id="features" className="h-full sm:py-32 py-20 sm:px-10 px-5 bg-gradient-to-b from-black to-black/50 relative overflow-hidden">
      <div className="screen-max-width">
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl text-gray-100 lg:text-7xl font-semibold">ZaavG.</h2>
            <h2 className="text-5xl text-gray-300 lg:text-7xl font-semibold">Forged in Bali.</h2>
          </div>
          <div className="flex items-center justify-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                ref={videoRef} // Video ref to control playback
              >
                <source src="/videos/1013.mov" type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col md:flex-row gap-5 items-center">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src="/IMG_4800.jpg" alt="titanium" className="w-full h-full object-cover object-center scale-150 opacity-0 g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src="/IMG_4807.jpg" alt="titanium2" className="w-full h-full object-cover object-center scale-150 opacity-0 g_grow" />
                </div>
              </div>

              <div className="w-full flex items-center justify-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                <div className="flex-1 flex items-center justify-center">
                  <p className="max-w-md text-gray-200 text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                   
                    ZaavG это{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    Украшения, заряженные энергетикой чудо-острова.
                    </span>
                    {" "}Уникальный дизайн со смыслом. Доставка по всему миру
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="max-w-md text-gray-200 text-lg md:text-xl font-semibold opacity-0 translate-y-[100px] g_text">
                   
                  Это не просто ювелирные украшения высокого качества.{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Zaav G</span>, - это образ мышления, стиль жизни и философия в каждом изделии.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
