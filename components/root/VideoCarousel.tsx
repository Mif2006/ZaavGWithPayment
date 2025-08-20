"use client";

import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "@/lib/constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "@/lib/utils";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

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

  // slider movement with gsap (smooth)
  useEffect(() => {
    gsap.to("#slider", {
      x: -100 * videoId + "%",
      duration: 1,
      ease: "none",
    });

    // animate active dot width
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
        duration: 0.5,
        ease: "none",
      });
    });
  }, [videoId]);

  // scroll trigger to auto start
  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#carousel",
      start: "top 80%",
      onEnter: () => playVideo(0),
    });
  }, []);

  const playVideo = (id: number) => {
    videoRef.current.forEach((v, i) => {
      if (!v) return;
      if (i === id) {
        v.currentTime = 0;
        v.play();
      } else {
        v.pause();
      }
    });
    setVideo({
      videoId: id,
      isPlaying: true,
      isLastVideo: id === hightlightsSlides.length - 1,
    });
  };

  const togglePlay = () => {
    const current = videoRef.current[videoId];
    if (!current) return;
    if (isPlaying) {
      current.pause();
      setVideo((prev) => ({ ...prev, isPlaying: false }));
    } else {
      current.play();
      setVideo((prev) => ({ ...prev, isPlaying: true }));
    }
  };

  const handleEnded = (i: number) => {
    if (i < hightlightsSlides.length - 1) {
      playVideo(i + 1);
    } else {
      setVideo({ videoId: i, isPlaying: false, isLastVideo: true });
    }
  };

  // progress bar sync
  const handleTimeUpdate = (i: number) => {
    const v = videoRef.current[i];
    const span = videoSpanRef.current[i];
    if (v && span) {
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
      <div className="flex items-center ml-20 overflow-hidden">
        <div
          id="slider"
          className="flex transition-transform duration-500"
          style={{ width: `${hightlightsSlides.length * 100}%` }}
        >
          {hightlightsSlides.map((list, i) => (
            <div
              key={list.id}
              className="sm:pr-20 pr-10 w-full flex-shrink-0"
              style={{ width: "100%" }}
            >
              <div className="video-carousel_container relative">
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
                    className="pointer-events-none min-w-full"
                  >
                    <source src={list.video} type="video/mp4" />
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-[10]">
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
              style={{ width: i === videoId ? "4vw" : "12px" }} // initial state
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
          className="ml-4 p-4 rounded-full bg-gray-400 backdrop-blur flex items-center justify-center"
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
