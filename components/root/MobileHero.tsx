"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Hero from "./DesignHero"

const MobileHero = () => {
  gsap.registerPlugin(ScrollTrigger)

  const triggerRef = useRef(null)

  useGSAP(() => {
    // Simple fade & slide animation for mobile
    gsap.fromTo(
      ".text2",
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 1.4,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    )

    gsap.fromTo(
      ".yeet",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <section
      id="mobilehero"
      ref={triggerRef}
      style={{ backgroundImage: `url(/purple2.jpeg)` }}
      className="bg-cover bg-center w-full flex flex-col items-center justify-center min-h-screen h-screen overflow-hidden relative"
    >
      <h1 className="text2 text-[28vw] font-bold text-center pt-[40vh] text-white drop-shadow-lg">
        ZAAVG
      </h1>

      <div
        className="yeet flex absolute top-1/2 left-1/2 
                   transform -translate-x-1/2 -translate-y-1/2 z-10 
                   opacity-0"
      >
        <Hero />
      </div>
    </section>
  )
}

export default MobileHero
