import { useEffect, useRef, useState } from 'react';

export const useAutoScroll = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (isPaused) return;
      
      scrollRef.current += 1;
      container.scrollLeft += 1;

      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
        container.scrollLeft = 0;
        scrollRef.current = 0;
      }
    };

    const intervalId = setInterval(scroll, 50);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return {
    isPaused,
    setIsPaused,
  };
};