import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  image: string;
  audioUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  testimonial,
  image,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="flex flex-col transition-transform duration-500 scale-[1] hover:scale-[1.1] w-[300px] bg-white/5 backdrop-blur-lg rounded-xl p-6 mx-3 flex-shrink-0">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
        </div>
      </div>
      
      <p className="text-gray-200 mb-6 line-clamp-3">{testimonial}</p>
      
      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-300 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
        </div>
        
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default TestimonialCard;