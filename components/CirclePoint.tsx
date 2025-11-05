import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

// Define the props interface
interface CirclePointProps {
  angle: number;        // The angle at which the point is positioned
  radius: number;       // The distance from the center to the point
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // The icon component (e.g., LucideIcon)
  color: string;        // The color of the icon (e.g., 'text-purple-500')
  onClick?: () => void; // Optional click handler
  className?: string;   // Optional additional classes for customization
}

export const CirclePoint: React.FC<CirclePointProps> = ({ angle, radius, Icon, color, onClick, className }) => {
  // Calculate position based on angle and radius
  const left = `${50 + radius * Math.cos(angle)}%`;
  const top = `${50 + radius * Math.sin(angle)}%`;

  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${className || ''}`}
      style={{ left, top }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Point circle */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-900 to-black 
                        border-2 border-purple-500/50 flex items-center justify-center cursor-pointer
                        shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]
                        transition-all duration-300 hover:scale-110"
        >
          {/* Icon */}
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color} drop-shadow-lg`} />

          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-full ${color.replace('text', 'bg')} blur-md opacity-20`} />
        </div>

        {/* Connection line to center */}
      </div>
    </div>
  );
};
