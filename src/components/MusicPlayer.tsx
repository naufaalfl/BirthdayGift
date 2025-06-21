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
      {/* Mobile Compact Player - Fixed at bottom */}
      <div className={`fixed bottom-4 left-4 right-4 z-50 sm:hidden transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white/98 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border-2 border-pink-200">
          <div className="flex items-center justify-between">
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
            </div>
          </div>
          
          {/* Expanded Spotify Player for Mobile */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isExpanded && showSpotify ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
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

      {/* Mobile Toggle Button - Show when player is hidden */}
      <div className={`fixed bottom-4 right-4 z-50 sm:hidden transition-all duration-300 ${
        isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <button
          onClick={toggleVisibility}
          className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
        >
          <Music className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Floating Music Button - Always visible for easy access */}
      <div className="fixed bottom-20 left-4 z-50 sm:hidden">
        <button
          onClick={toggleVisibility}
          className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30"
        >
          <Music className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Player - Fixed at top right */}
      <div className={`fixed top-4 right-4 z-40 hidden sm:block transition-all duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-white/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-white/30">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpotify}
              className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <Music className={`w-5 h-5 ${showSpotify ? 'animate-pulse' : ''}`} />
            </button>
            
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {!autoplayTriggered && (
              <button
                onClick={forcePlay}
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
                title="Force Play Music"
              >
                <Play className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={toggleMinimize}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            >
              {isMinimized ? <Minimize2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {/* Desktop Spotify Player */}
        <div className={`transition-all duration-300 overflow-hidden ${
          showSpotify && !isMinimized ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-2 shadow-lg border border-white/30">
            <iframe 
              ref={iframeRef}
              style={{borderRadius: "12px"}} 
              src="https://open.spotify.com/embed/track/4Fv6wNYUixnYkj3Dgfrls8?utm_source=generator&theme=0&autoplay=1" 
              width="300" 
              height="80" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </div>
        
        {/* Desktop Music Info */}
        <div className={`transition-all duration-300 overflow-hidden ${
          !isMinimized ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-2 text-center">
            <p className="text-xs text-gray-700 font-medium">🎵 Tumblr Girl 2 - G-Eazy</p>
            {isPlaying && autoplayTriggered && (
              <p className="text-xs text-green-600 font-medium mt-1">▶️ Playing...</p>
            )}
            {!autoplayTriggered && (
              <p className="text-xs text-yellow-600 font-medium mt-1">👆 Tap anywhere or click play button</p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Toggle Button - Show when player is hidden */}
      <div className={`fixed top-4 right-4 z-40 hidden sm:block transition-all duration-300 ${
        isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <button
          onClick={toggleVisibility}
          className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Music className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default MusicPlayer;