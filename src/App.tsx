import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Music, Gift, Cake, PartyPopper } from 'lucide-react';
import HeroSection from './components/HeroSection';
import PhotoGallery from './components/PhotoGallery';
import WishesSection from './components/WishesSection';
import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';
import CountdownTimer from './components/CountdownTimer';
import MemoryTimeline from './components/MemoryTimeline';
import InteractiveCard from './components/InteractiveCard';
import ParticleSystem from './components/ParticleSystem';
import NavigationMenu from './components/NavigationMenu';
import LoveCalculator from './components/LoveCalculator';
import PhotoBooth from './components/PhotoBooth';
import WishingWell from './components/WishingWell';
import Fireworks from './components/Fireworks';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [showFireworks, setShowFireworks] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle user interaction untuk autoplay music
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        // Trigger music autoplay setelah interaksi pengguna
        const musicEvent = new CustomEvent('startMusic');
        window.dispatchEvent(musicEvent);
        
        // Also try direct iframe refresh
        const iframes = document.querySelectorAll('iframe[src*="spotify"]');
        iframes.forEach(iframe => {
          const currentSrc = iframe.getAttribute('src');
          if (currentSrc && !currentSrc.includes('autoplay=1')) {
            const newSrc = currentSrc.includes('?') 
              ? `${currentSrc}&autoplay=1` 
              : `${currentSrc}?autoplay=1`;
            iframe.setAttribute('src', newSrc);
          }
        });
      }
    };

    // Listen untuk berbagai jenis interaksi pengguna
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    // Fallback timer untuk autoplay
    const fallbackTimer = setTimeout(() => {
      if (!userInteracted) {
        handleUserInteraction();
      }
    }, 3000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      clearTimeout(fallbackTimer);
    };
  }, [userInteracted]);

  const loadingVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: { 
      scale: [0, 1.2, 1], 
      rotate: [0, 360, 720],
      transition: { duration: 2, ease: "easeInOut" }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-white'
    }`}>
      <MusicPlayer />
      <NavigationMenu currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <AnimatePresence>
        {showFireworks && <Fireworks />}
      </AnimatePresence>

      {/* Enhanced Loading Animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center text-white">
              <motion.div 
                className="mb-8"
                variants={loadingVariants}
                initial="initial"
                animate="animate"
              >
                <div className="relative">
                  <Cake className="w-24 h-24 mx-auto text-white" />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl font-bold mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Loading Magic...
              </motion.h1>
              
              <motion.p 
                className="text-2xl mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Preparing something extraordinary 💕
              </motion.p>

              <motion.div 
                className="w-full max-w-xs h-2 bg-white/20 rounded-full mx-auto overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: 256 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with bottom padding for mobile music player */}
      <motion.div 
        className={`transition-all duration-1000 pb-20 sm:pb-0 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {currentSection === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
            </motion.div>
          )}
          
          {currentSection === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <CountdownTimer />
            </motion.div>
          )}
          
          {currentSection === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <PhotoGallery />
            </motion.div>
          )}
          
          {currentSection === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryTimeline />
            </motion.div>
          )}
          
          {currentSection === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InteractiveCard />
            </motion.div>
          )}
          
          {currentSection === 'love' && (
            <motion.div
              key="love"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
            >
              <LoveCalculator />
            </motion.div>
          )}
          
          {currentSection === 'booth' && (
            <motion.div
              key="booth"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5 }}
            >
              <PhotoBooth />
            </motion.div>
          )}
          
          {currentSection === 'wishes' && (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.5 }}
            >
              <WishesSection />
            </motion.div>
          )}
          
          {currentSection === 'well' && (
            <motion.div
              key="well"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <WishingWell />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Footer */}
        <motion.footer 
          className={`${isDarkMode ? 'bg-gradient-to-r from-purple-800 to-pink-800' : 'bg-gradient-to-r from-pink-500 to-purple-600'} text-white py-12 text-center relative overflow-hidden`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          
          <motion.div 
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-8 h-8 text-pink-200" fill="currentColor" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                Made with Infinite Love
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-8 h-8 text-pink-200" fill="currentColor" />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-pink-100 text-xl mb-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Happy Sweet Seventeen, My Beautiful Angel! 🎂✨👑
            </motion.p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-pink-200">
              <PartyPopper className="w-5 h-5" />
              <span>Forever & Always</span>
              <PartyPopper className="w-5 h-5" />
            </div>
          </motion.div>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;