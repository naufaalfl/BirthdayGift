import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, RotateCcw, Sparkles, Heart, Star } from 'lucide-react';

const PhotoBooth = () => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frames = [
    {
      name: "Sweet Hearts",
      style: "border-8 border-pink-400 rounded-3xl",
      decoration: "💕 Sweet Seventeen 💕"
    },
    {
      name: "Star Frame",
      style: "border-8 border-yellow-400 rounded-3xl",
      decoration: "⭐ Birthday Star ⭐"
    },
    {
      name: "Purple Dream",
      style: "border-8 border-purple-400 rounded-3xl",
      decoration: "💜 Dream Come True 💜"
    },
    {
      name: "Rainbow Love",
      style: "border-8 border-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl",
      decoration: "🌈 Colorful Love 🌈"
    }
  ];

  const takePhoto = () => {
    setIsCapturing(true);
    
    // Simulate photo capture
    setTimeout(() => {
      // In a real app, this would capture from camera
      setCapturedPhoto('/IMG-20250622-WA0020.jpg');
      setIsCapturing(false);
    }, 1000);
  };

  const downloadPhoto = () => {
    // In a real app, this would download the framed photo
    console.log('Downloading photo...');
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-teal-600 bg-clip-text text-transparent">
              Photo Booth
            </h2>
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Abadikan momen serumu dengan bingkai lucu! 📸✨</p>
        </motion.div>

        {/* Photo Booth Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Photo Display */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className={`relative p-4 sm:p-6 ${frames[selectedFrame].style}`}>
              <AnimatePresence>
                {isCapturing && (
                  <motion.div
                    className="absolute inset-0 bg-white z-20 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-4xl font-bold">{3 - Math.floor(countdown / 333)}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover"/>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera className="w-24 h-24" />
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
                  {frames[selectedFrame].decoration}
                </span>
              </div>
              
              <div className="absolute -top-4 -left-4">
                <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
              </div>
              <div className="absolute -bottom-4 -right-4">
                <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Pilih Bingkai Favoritmu</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {frames.map((frame, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFrame(index)}
                    className={`p-3 rounded-2xl transition-all duration-300 ${selectedFrame === index ? 'ring-4 ring-purple-500 shadow-lg' : ''}`}
                  >
                    <div className={`w-full aspect-square ${frame.style} flex items-center justify-center text-center p-2`}>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{frame.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  onClick={takePhoto}
                  disabled={isCapturing}
                  className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5" />
                    <span>{isCapturing ? 'Capturing...' : 'Take Photo'}</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={downloadPhoto}
                  disabled={!capturedPhoto}
                  className="bg-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoBooth;