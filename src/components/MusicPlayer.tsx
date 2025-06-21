import React, { useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [showSpotify, setShowSpotify] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleSpotify = () => {
    setShowSpotify(!showSpotify);
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="bg-white/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/30">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpotify}
            className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            <Music className={`w-5 h-5 ${showSpotify ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Spotify Player */}
      {showSpotify && (
        <div className="mt-2 bg-white/20 backdrop-blur-lg rounded-lg p-2 shadow-lg border border-white/30">
          <iframe 
            style={{borderRadius: "12px"}} 
            src="https://open.spotify.com/embed/track/4Fv6wNYUixnYkj3Dgfrls8?utm_source=generator&theme=0" 
            width="300" 
            height="80" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      )}
      
      {/* Music Info */}
      <div className="mt-2 bg-white/20 backdrop-blur-lg rounded-lg p-2 text-center">
        <p className="text-xs text-gray-700 font-medium">🎵 Tumblr Girl 2 - G-Eazy</p>
      </div>
    </div>
  );
};

export default MusicPlayer;