"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Observer, ScrollToPlugin, ScrollTrigger } from "gsap/all"
import Hero from "./DesignHero"

const TrueHero = () => { 
  gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger)
  const wordRef = useRef(null)
  const triggerRef = useRef(null)

  useGSAP(() => {
    const text = gsap.utils.toArray<HTMLElement>(".text")[0]

    // --- Image timeline (yours as-is) ---
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 })

    tl.to(".image", {
      rotate: 45,
      y: 200,
      x: 10,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 2,
    })

    tl.from(".image2", {
      x: -50,
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".image2", {
      rotate: 45,
      y: 200,
      x: 10,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 2,
    })

    tl.from(".image3", {
      x: -50,
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(".image3", {
      rotate: 45,
      y: 200,
      x: 10,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 2,
    })

    // --- Hands animation ---
    gsap.to(".hands", {
      width: "100px",
      opacity: 0,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 5,
      },
    })

    // --- Base scroll-driven text animation ---
    gsap.to(text, {
      paddingLeft: "0px",
      scale: 50,
      paddingRight: "200px",
      ease: "power1.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 5, // strict tie to scrollbar
        pin: true,
        onUpdate: (self) => {
          if (self.progress >= 0.80) {
            gsap.to(".yeet", {
              opacity: 1,
              duration: 1,
              z: 5,
            })
          } else if (self.progress <= 0.75) {
            gsap.to(".yeet", {
              opacity: 0,
              duration: 1,
              z: 1,
            })
          }
        },
      },
    })

    // --- Velocity-based boost layer ---
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=200%",
      onUpdate: (self) => {
        const velocity = self.getVelocity() // px/s
        if (Math.abs(velocity) > 1000) {
          if (velocity > 0) {
            // fling down
            gsap.to(text, {
              scale: "+=10",
              duration: 0.5,
              ease: "power2.out",
            })
          } else {
            // fling up
            gsap.to(text, {
              scale: "-=10",
              duration: 0.5,
              ease: "power2.out",
            })
          }
        }
      },
    })
  }, [])

  return (
    <>
      <section 
        id="truehero" 
        ref={triggerRef} 
        style={{ backgroundImage: `url(/purple2.jpeg)` }} 
        className="bg-cover bg-center w-full flex items-center justify-center min-h-screen h-screen overflow-hidden relative"
      >
        <img 
          src="/IMG_6202.png" 
          className="hands absolute top-[-43vh] w-[700px] z-[12] rotate-[90deg]" 
        />
        <h1 
          ref={wordRef} 
          style={{ right: "-34%", bottom: "-35%" }} 
          className="z-2 hidden md:block text min-h-screen min-w-screen p-[400px] absolute text-[37vw] font-bold transform rotate-[-6deg] translate-x-[3%] translate-y-[20%]"
        >
          ZAAVG
        </h1>
        <h1 
          style={{ right: "-34%", bottom: "-35%" }} 
          className="absolute top-0 pt-[30vh] left-0 z-2 block md:hidden text2 mr-[30vw] absolute text-[28vw] font-bold"
        >
          ZAAVG
        </h1>
        <div className="absolute top-36 left-20 flex flex-row gap-36 z-3 rotate-[-6deg] h-[300px] w-[300px]">
          {/* image components */}
        </div>
        <div 
          className="yeet hidden md:flex absolute top-1/2 left-1/2 
                     transform -translate-x-1/2 -translate-y-1/2 z-10 
                     opacity-0"
        >
          <Hero />
        </div>
      </section>
    </>
  )
}

export default TrueHero
