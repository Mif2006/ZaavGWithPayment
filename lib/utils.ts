import gsap from "gsap";
import replay from "@/public/replay.svg";
import play from "@/public/play.svg";
import pause from "@/public/pause.svg";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ScrollTrigger } from "gsap/all";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Utility function for merging class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GSAP animation helper
export const animateWithGsap = (
  target: gsap.DOMTarget,
  animationProps: gsap.TweenVars,
  scrollProps?: Partial<ScrollTrigger.Vars>
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps,
    }
  });
};

// GSAP timeline animation helper
export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: React.RefObject<{ rotation: number }>,
  rotationState: number,
  firstTarget: gsap.DOMTarget,
  secondTarget: gsap.DOMTarget,
  animationProps: gsap.TweenVars
) => {
  if (!rotationRef.current) return;

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.inOut'
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: 'power2.inOut'
    },
    '<'
  );
};

// Export image assets
export const replayImg = replay;
export const playImg = play;
export const pauseImg = pause;