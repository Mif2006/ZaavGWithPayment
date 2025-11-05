import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Shop = () => {
  useGSAP(() => {
    // GSAP animation on page load
    gsap.fromTo(".store-video", 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, ease: "power2.inOut" });

    gsap.fromTo(".intro-text", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2, ease: "power2.out" });

    gsap.fromTo(".details-text", 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, delay: 2, ease: "power2.out" });

    gsap.fromTo(".cta-button", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2, delay: 3, ease: "power2.out" });
  }, []);

  return (
    <div id="shop" className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop>
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 px-6 md:px-12">
        <h1 className="intro-text text-4xl md:text-6xl font-bold mb-6">
        АРТ ПРОСТРАНСТВО <span className='text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600'> ZaavG </span>
        </h1>
        <p className="details-text text-xl md:text-2xl mb-8">
        Наш магазин находится в самом сердце столицы.
В 10-ти минутах от Красной площади.
Метро Новокузнецкая/Третьяковская.

        </p>
        <a href='https://yandex.by/maps/org/zaav_g/76673064389/?ll=37.631595%2C55.741181&utm_source=share&z=16'>
        <button className="cta-button px-8 py-3 bg-gradient-to-r from-purple-500 hover:from-purple-700 hover:to-indigo-600 to-indigo-600 text-white text-lg rounded-full shadow-lg ">
          Посетить магазин
        </button>
        </a>
      </div>
    </div>
  );
};

export default Shop;
