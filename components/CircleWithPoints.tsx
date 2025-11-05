"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { CirclePoint } from "./CirclePoint";
import { X, Zap, Gem } from "lucide-react";
import { points } from "@/lib/constants";

interface Point {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  image: string;
  category: string;
  date: string;
  title: string;
  description: string;
  status: number;
}

const CircleWithPoints: React.FC = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef<gsap.core.Tween | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false); // To ensure no hydration issues

  const getPrevPoint = (current: number) => (current - 1 + points.length) % points.length;
  const getNextPoint = (current: number) => (current + 1) % points.length;

  useEffect(() => {
    // Set isHydrated to true once the component has been mounted in the browser
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !circleRef.current) return;

    // GSAP Animation Logic for Rotating Circle
    rotationRef.current = gsap.to(circleRef.current, {
      rotation: 360,
      duration: 60,
      ease: "linear",
      repeat: -1,
      transformOrigin: "center center",
    });

    return () => {
      rotationRef.current?.kill(); // Clean up GSAP animation on unmount
    };
  }, [isHydrated]); // Only run once hydration is complete

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        selectedPoint !== null &&
        cardRef.current &&
        !cardRef.current.contains(target) &&
        !target.closest(".circle-point")
      ) {
        setShowCard(false);
        setSelectedPoint(null);

        if (circleRef.current) {
          rotationRef.current = gsap.to(circleRef.current, {
            rotation: 360,
            duration: 60,
            ease: "linear",
            repeat: -1,
            transformOrigin: "center center",
          });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedPoint]);

  const handlePointClick = (index: number) => {
    if (!circleRef.current || !rotationRef.current) return;

    setShowCard(false);
    setSelectedPoint(index);

    rotationRef.current.kill();

    const currentRotation = gsap.getProperty(circleRef.current, "rotation") as number;
    const targetAngle = -index * (360 / points.length) - 90;

    let delta = targetAngle - (currentRotation % 360);
    if (Math.abs(delta) > 180) {
      delta = delta > 0 ? delta - 360 : delta + 360;
    }

    gsap.to(circleRef.current, {
      rotation: currentRotation + delta,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => setShowCard(true),
    });
  };

  useEffect(() => {
    if (showCard && cardRef.current) {
      gsap.set(cardRef.current, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
      });

      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  }, [showCard]);

  // Wait for hydration to avoid any mismatch
  if (!isHydrated) return null;

  return (
    <section className="relative w-full h-[120vh] bg-gradient-to-bl from-black via-purple-900/20 to-black flex items-center justify-center py-20">
      {/* Title Section */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 justify-center">
          <Gem className="text-purple-400 w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12" />
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center text-purple-400">
            Творим для Вас
          </h1>
          <Gem className="text-purple-400 w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rotate-180" />
        </div>
        <p className="text-gray-100 text-base md:text-lg max-w-2xl mx-auto px-4">
          Каждый день мы усердно работаем, чтобы сделать жизнь наших клиентов ярче и красивее
        </p>
      </div>

      <div className="relative w-full h-full flex items-center justify-center mt-32">
        {/* Center Text */}
        <div
          className={`absolute z-10 text-center pointer-events-auto transition-opacity duration-500 ${
            selectedPoint !== null ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text hover:text-transparent transition-all duration-500 ease-in-out cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ZAAVG
          </h1>
        </div>

        {/* Rotating Circle */}
        <div
          ref={circleRef}
          className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px]"
        >
          <div className="absolute inset-0 rounded-full border border-gray-400 opacity-60"></div>
          <div className="absolute inset-1 rounded-full border border-purple-300 opacity-30 blur-[1px]"></div>
          <div className="absolute -inset-1 rounded-full border border-purple-200 opacity-10 blur-[2px]"></div>

          {points.map((point: Point, index: number) => {
            const angle = (index * (360 / points.length)) * (Math.PI / 180);
            const radius = 50;

            return (
              <CirclePoint
                key={index}
                className="circle-point"
                angle={angle}
                radius={radius}
                Icon={point.Icon}
                color={point.color}
                onClick={() => handlePointClick(index)}
              />
            );
          })}
        </div>

        {/* Card */}
        {selectedPoint !== null && showCard && (
          <div
            ref={cardRef}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] bg-cover bg-center"
            style={{ marginTop: "-40px", transformOrigin: "center center" }}
          >
            <div
              className="relative backdrop-blur-xl bg-cover bg-center rounded-2xl py-12 p-6"
              style={{ backgroundImage: `url(${points[selectedPoint].image})` }}
            >
              <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

              <div className="relative z-10">
                <button
                  onClick={() => {
                    if (!cardRef.current) return;
                    gsap.to(cardRef.current, {
                      opacity: 0,
                      scale: 0.8,
                      duration: 0.3,
                      ease: "power2.in",
                      onComplete: () => {
                        setShowCard(false);
                        setSelectedPoint(null);
                        if (circleRef.current) {
                          rotationRef.current = gsap.to(circleRef.current, {
                            rotation: 360,
                            duration: 60,
                            ease: "linear",
                            repeat: -1,
                            transformOrigin: "center center",
                          });
                        }
                      },
                    });
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/20"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/80 to-indigo-500/80 text-xs font-medium mb-4 text-white border border-white/20">
                  {points[selectedPoint].category}
                </div>
                <div className="text-gray-200 text-sm mb-6 font-medium">{points[selectedPoint].date}</div>
                <h2 className="text-2xl font-semibold text-white mb-3 drop-shadow-lg">
                  {points[selectedPoint].title}
                </h2>
                <p className="text-gray-100 text-sm mb-6 leading-relaxed drop-shadow-md">
                  {points[selectedPoint].description}
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-200 flex items-center gap-2 font-medium">
                      <Zap className="w-4 h-4 text-yellow-400" /> Уровень Качества
                    </span>
                    <span className="text-sm text-white font-bold">{points[selectedPoint].status}%</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 via-purple-500 to-amber-400 rounded-full shadow-lg"
                      style={{ width: `${points[selectedPoint].status}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePointClick(getPrevPoint(selectedPoint))}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/30 text-xs text-white hover:bg-black/60 transition-colors flex items-center gap-2 backdrop-blur-sm"
                  >
                    {(() => {
                      const PrevIcon = points[getPrevPoint(selectedPoint)].Icon;
                      return <PrevIcon className={`w-3 h-3 ${points[getPrevPoint(selectedPoint)].color}`} />;
                    })()}
                    ← {points[getPrevPoint(selectedPoint)].title}
                  </button>
                  <button
                    onClick={() => handlePointClick(getNextPoint(selectedPoint))}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/30 text-xs text-white hover:bg-black/60 transition-colors flex items-center gap-2 backdrop-blur-sm"
                  >
                    {(() => {
                      const NextIcon = points[getNextPoint(selectedPoint)].Icon;
                      return <NextIcon className={`w-3 h-3 ${points[getNextPoint(selectedPoint)].color}`} />;
                    })()}
                    {points[getNextPoint(selectedPoint)].title} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CircleWithPoints;
