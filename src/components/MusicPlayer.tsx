import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, X, Minimize2, ChevronUp, ChevronDown } from 'lucide-react';

const MusicPlayer = () => {
  const [showSpotify, setShowSpotify] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayTriggered, setAutoplayTriggered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-start music when component mounts
  useEffect(() => {
    const startMusic = () => {
      if (!autoplayTriggered) {
        setAutoplayTriggered(true);
        setShowSpotify(true);
        setIsPlaying(true);
        
        // Force refresh iframe dengan autoplay parameter
        if (iframeRef.current) {
          const baseUrl = "https://open.spotify.com/embed/track/4Fv6wNYUixnYkj3Dgfrls8?utm_source=generator&theme=0";
          const newSrc = `${baseUrl}&autoplay=1`;
          iframeRef.current.src = newSrc;
          
          // Force reload after a short delay to ensure autoplay works
          setTimeout(() => {
            if (iframeRef.current) {
              iframeRef.current.src = newSrc;
            }
          }, 100);
        }
      }
    };

    // Try to start music immediately
    startMusic();

    // Also listen for user interactions
    const handleUserInteraction = () => {
      startMusic();
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Listen for custom startMusic event
    window.addEventListener('startMusic', startMusic);

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
      startMusic();
    }, 2000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      window.removeEventListener('startMusic', startMusic);
      clearTimeout(fallbackTimer);
    };
  }, [autoplayTriggered]);

  const toggleSpotify = () => {
    setShowSpotify(!showSpotify);
    if (!showSpotify) {
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      const newSrc = isMuted 
        ? currentSrc.replace('autoplay=0', 'autoplay=1')
        : currentSrc.replace('autoplay=1', 'autoplay=0');
      iframeRef.current.src = newSrc;
    }
  };

  const forcePlay = () => {
    setAutoplayTriggered(true);
    setShowSpotify(true);
    setIsPlaying(true);
    
    if (iframeRef.current) {
      const baseUrl = "https://open.spotify.com/embed/track/4Fv6wNYUixnYkj3Dgfrls8?utm_source=generator&theme=0";
      const newSrc = `${baseUrl}&autoplay=1`;
      iframeRef.current.src = newSrc;
      
      // Force reload after a short delay to ensure autoplay works
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = newSrc;
        }
      }, 100);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Desktop & Mobile Top Bar Player */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={toggleSpotify}
                  className="flex-shrink-0 p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                >
                  <Music className={`w-5 h-5 ${showSpotify ? 'animate-pulse' : ''}`} />
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-bold truncate">🎵 Tumblr Girl 2 - G-Eazy</p>
                  {isPlaying && autoplayTriggered && (
                    <p className="text-xs text-green-600 font-semibold">▶️ Playing...</p>
                  )}
                  {!autoplayTriggered && (
                    <p className="text-xs text-yellow-600 font-semibold">👆 Tap to start</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-white/30 text-gray-700 hover:bg-white/50 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 border border-gray-200"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                {!autoplayTriggered && (
                  <button
                    onClick={forcePlay}
                    className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
                    title="Force Play Music"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={toggleExpand}
                  className="p-3 rounded-full bg-white/30 text-gray-700 hover:bg-white/50 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 border border-gray-200"
                >
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>

                <button
                  onClick={toggleVisibility}
                  className="p-3 rounded-full bg-white/30 text-gray-700 hover:bg-white/50 transition-all duration-300 shadow-md hover:scale-110 active:scale-95 border border-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Expanded Spotify Player */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isExpanded && showSpotify ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="max-w-6xl mx-auto px-4 pb-4">
              <div className="bg-white/70 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-white/50">
                <iframe 
                  ref={iframeRef}
                  style={{borderRadius: "8px"}} 
                  src="https://open.spotify.com/embed/track/4Fv6wNYUixnYkj3Dgfrls8?utm_source=generator&theme=0&autoplay=1" 
                  width="100%" 
                  height="80" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show Player Button - when player is hidden */}
      <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <button
          onClick={toggleVisibility}
          className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl hover:scale-110 transition-transform duration-300"
          title="Show Music Player"
        >
          <Music className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;