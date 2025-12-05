"use client";

import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "@/lib/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

interface Slide {
  id: number;
  video: string;
  videoDuration: number;
  textLists: string[];
}

interface VideoState {
  videoId: number;
  isPlaying: boolean;
  isLastVideo: boolean;
}

const VideoCarousel: React.FC = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const draggableRef = useRef<any>(null);

  const [video, setVideo] = useState<VideoState>({
    videoId: 0,
    isPlaying: false,
    isLastVideo: false,
  });

  const { videoId, isPlaying, isLastVideo } = video;

  // initialize refs
  useEffect(() => {
    videoDivRef.current = new Array(hightlightsSlides.length).fill(null);
    videoSpanRef.current = new Array(hightlightsSlides.length).fill(null);
  }, []);

  // helper: slideWidth in px (80vw)
  const getSlideWidthPx = () => Math.round(window.innerWidth * 0.8);
  const getMaxTranslate = () =>
    -((hightlightsSlides.length - 1) * getSlideWidthPx());

  // animate slider and dots to current videoId
  useEffect(() => {
    const x = -videoId * getSlideWidthPx();
    gsap.to(sliderRef.current, {
      x: x,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });

    videoDivRef.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        width:
          i === videoId
            ? window.innerWidth < 760
              ? "10vw"
              : window.innerWidth < 1200
              ? "10vw"
              : "4vw"
            : "12px",
        duration: 0.4,
        ease: "linear",
      });
    });
  }, [videoId]);

  // scroll trigger to auto start (keeps your original behaviour)
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#carousel",
      start: "top 80%",
      onEnter: () => playVideo(0),
    });

    return () => st.kill();
  }, []);

  // make slider draggable (free drag) and snap on release
  useEffect(() => {
    if (!sliderRef.current) return;

    // kill old draggable if exists
    if (draggableRef.current) {
      try {
        draggableRef.current.kill();
      } catch (e) {}
      draggableRef.current = null;
    }

    const slideW = getSlideWidthPx();
    const minX = getMaxTranslate(); // negative
    const maxX = 0;

    // create draggable
    draggableRef.current = Draggable.create(sliderRef.current, {
      type: "x",
      bounds: { minX, maxX },
      edgeResistance: 0.9,
      throwProps: false, // do not require Inertia plugin
      onDragStart() {
        // pause current video while dragging
        const cur = videoRef.current[videoId];
        if (cur) {
          cur.pause();
          setVideo((prev) => ({ ...prev, isPlaying: false }));
        }
      },
      onDrag() {
        // update progress dots widths live (optional)
        // we could also update an activeIndex during drag but we'll snap on release
      },
      onDragEnd() {
        // compute nearest slide index, but bias by velocity to make flicking feel natural
        // Draggable.getVelocity exists; fallback to 0 if not available
        const drag = draggableRef.current[0];
        const curX = drag.x;
        // velocity in px/sec (may be undefined in some environments)
        const vx = typeof drag.getVelocity === "function" ? drag.getVelocity("x") : 0;

        // raw index
        let rawIndex = -curX / slideW;
        // bias by velocity: if vx is negative (swiped left) push index +0.4
        const bias = vx < 0 ? 0.35 : vx > 0 ? -0.35 : 0;
        const snapped = Math.round(rawIndex + bias);

        const clamped = Math.max(0, Math.min(hightlightsSlides.length - 1, snapped));

        // animate to snapped slide
        gsap.to(sliderRef.current, {
          x: -clamped * slideW,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => {
            // make sure state is consistent and play the chosen slide
            playVideo(clamped);
          },
        });
      },
    })[0];

    // update bounds on resize
    const onResize = () => {
      if (!draggableRef.current) return;
      const newSlideW = getSlideWidthPx();
      const newMin = -((hightlightsSlides.length - 1) * newSlideW);
      draggableRef.current.applyBounds({ minX: newMin, maxX: 0 });
      // snap slider to current videoId in the new coordinate system
      gsap.set(sliderRef.current, { x: -videoId * newSlideW });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (draggableRef.current) {
        try {
          draggableRef.current.kill();
        } catch (e) {}
        draggableRef.current = null;
      }
    };
    // we intentionally avoid adding videoId to deps here; snapping/play handled onDragEnd
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current]);

  const playVideo = (id: number) => {
    videoRef.current.forEach((v, i) => {
      if (!v) return;
      if (i === id) {
        // reset to start and play
        try {
          v.currentTime = 0;
        } catch (e) {}
        v.play().catch(() => {
          // autoplay may be blocked; that's fine
        });
      } else {
        v.pause();
      }
    });
    setVideo({
      videoId: id,
      isPlaying: true,
      isLastVideo: false,
    });

    // make sure draggable/slider is in synced X (in case playVideo called by user)
    const slideW = getSlideWidthPx();
    gsap.to(sliderRef.current, { x: -id * slideW, duration: 0.45, ease: "power2.out" });
  };

  const handleEnded = (i: number) => {
    if (i < hightlightsSlides.length - 1) {
      playVideo(i + 1);
    } else {
      setVideo({ videoId: i, isPlaying: false, isLastVideo: true });
    }
  };

  const togglePlay = () => {
    const current = videoRef.current[videoId];
    if (!current) return;
    if (isPlaying) {
      current.pause();
      setVideo((prev) => ({ ...prev, isPlaying: false }));
    } else {
      current.play().catch(() => {
        // autoplay might be blocked by browser; ignore
      });
      setVideo((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  // progress bar sync
  const handleTimeUpdate = (i: number) => {
    const v = videoRef.current[i];
    const span = videoSpanRef.current[i];
    if (v && span && v.duration) {
      const percent = (v.currentTime / v.duration) * 100;
      gsap.to(span, {
        width: `${percent}%`,
        backgroundColor: "white",
        overwrite: true,
      });
    }
  };

  return (
    <div id="carousel" className="w-full">
      {/* allow overflow so neighbours peek */}
      <div className="flex items-center ml-20">
        <div
          id="slider"
          ref={sliderRef}
          className="flex"
          style={{ width: `${hightlightsSlides.length * 80}vw`, cursor: "grab" }}
        >
          {hightlightsSlides.map((list, i) => (
            <div
              key={list.id}
              className="pr-10 flex-shrink-0"
              style={{ width: "80vw" }}
            >
              <div className="video-carousel_container relative">
                {/* overflow-hidden only here to clip video edges */}
                <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id={`video-${i}`}
                    playsInline
                    preload="auto"
                    muted
                    ref={(el) => {
                      if (el) videoRef.current[i] = el;
                    }}
                    onEnded={() => handleEnded(i)}
                    onTimeUpdate={() => handleTimeUpdate(i)}
                    className="pointer-events-none w-full h-full object-cover"
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute text-white top-12 left-[5%] z-[10]">
                  {list.textLists.map((text, index) => (
                    <p
                      key={`${list.id}-${index}`}
                      className={`${
                        index === 0 ? "text-3xl pb-2" : "text-xl"
                      } font-medium`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress + controls */}
      <div className="relative flex items-center justify-center mt-10">
        <div className="flex items-center justify-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) videoDivRef.current[i] = el;
              }}
              onClick={() => playVideo(i)}
              className="mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden"
              style={{ width: i === videoId ? "4vw" : "12px" }}
            >
              <span
                className="absolute h-full w-0 rounded-full"
                ref={(el) => {
                  if (el) videoSpanRef.current[i] = el;
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="ml-4 p-4 cursor-pointer hover:scale-110 transition-transform duration-500 rounded-full bg-gray-400 backdrop-blur flex items-center justify-center"
          onClick={isLastVideo ? () => playVideo(0) : togglePlay}
        >
          <img
            src={isLastVideo ? "/replay.svg" : !isPlaying ? "/play.svg" : "/pause.svg"}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
