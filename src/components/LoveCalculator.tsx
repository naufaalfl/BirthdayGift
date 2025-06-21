import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calculator, Sparkles, Star, Send } from 'lucide-react';

const LoveCalculator = () => {
  const [yourName, setYourName] = useState('Parker');
  const [partnerName, setPartnerName] = useState('Halza');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    if (!yourName.trim() || !partnerName.trim()) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Fun algorithm that always gives high results for romantic effect
      const combined = (yourName + partnerName).toLowerCase();
      let score = 0;
      
      for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
      }
      
      // Ensure result is between 85-100 for romantic effect
      const loveScore = 85 + (score % 16);
      setResult(loveScore);
      setIsCalculating(false);
    }, 2000);
  };

  const getLoveMessage = (score: number) => {
    if (score >= 95) return "Perfect Match! 💕 Kalian ditakdirkan bersama!";
    if (score >= 90) return "Amazing Love! ✨ Cinta kalian sangat kuat!";
    if (score >= 85) return "Great Connection! 💖 Hubungan yang indah!";
    return "Sweet Love! 🌹 Terus jaga cinta kalian!";
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Love Calculator
            </h2>
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Seberapa cocok kita? Hitung di sini! ❤️</p>
        </motion.div>

        {/* Calculator Form */}
        <motion.div
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center mb-6 sm:mb-8">
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none text-base sm:text-lg"
            />
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Partner's Name"
              className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-base sm:text-lg"
            />
          </div>
          
          <motion.button
            onClick={calculateLove}
            disabled={!yourName || !partnerName}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCalculating ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
                Calculating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Calculate Love
              </div>
            )}
          </motion.button>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result !== null && (
            <motion.div
              className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white rounded-3xl p-6 sm:p-10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <motion.div
                className="text-6xl sm:text-8xl font-bold mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {result}%
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{getLoveMessage(result)}</h3>
              <p className="text-lg sm:text-xl opacity-90">
                {yourName} & {partnerName} are meant to be! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveCalculator;