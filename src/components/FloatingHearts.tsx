import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <Heart 
            className={`text-pink-300 opacity-30 ${
              Math.random() > 0.5 ? 'w-4 h-4' : 'w-6 h-6'
            }`}
            fill="currentColor"
          />
        </div>
      ))}
      
      {/* Floating Stars */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          <div className="text-yellow-300 opacity-40 text-2xl">✨</div>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;