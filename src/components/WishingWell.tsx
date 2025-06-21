import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Star, Heart, Send, Sparkles } from 'lucide-react';

const WishingWell = () => {
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const submitWish = () => {
    if (!wish.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setWishes([...wishes, wish]);
      setWish('');
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const magicalWishes = [
    "Semoga cinta kita abadi selamanya 💕",
    "Semoga mimpi-mimpimu semua terwujud ✨",
    "Semoga kita selalu bahagia bersama 🌟",
    "Semoga hari-harimu penuh keajaiban 🎭",
    "Semoga kita tumbuh bersama selamanya 🌱"
  ];

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
            <Wand2 className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
              Wishing Well
            </h2>
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Buat permohonan ajaib untuk masa depan! ✨</p>
        </motion.div>

        {/* Magical Well */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 rounded-full w-64 h-64 sm:w-80 sm:h-80 mx-auto relative overflow-hidden shadow-2xl">
            {/* Water Effect */}
            <motion.div
              className="absolute inset-4 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full"
              animate={{ 
                background: [
                  "linear-gradient(45deg, #60a5fa, #22d3ee)",
                  "linear-gradient(45deg, #22d3ee, #a78bfa)",
                  "linear-gradient(45deg, #a78bfa, #60a5fa)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Ripples */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-white/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                animate={{
                  y: [-10, -30, -10],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
              </motion.div>
            ))}
          </div>

          {/* Well Rim */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-72 sm:w-96 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-lg"></div>
        </motion.div>

        {/* Wish Input */}
        <motion.div
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Buat Permohonan Ajaib</h3>
          
          <div className="space-y-4">
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Tulis permohonanmu di sini... ✨"
              className="w-full h-24 sm:h-32 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none resize-none text-base sm:text-lg"
              maxLength={200}
            />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-gray-500">{wish.length}/200 karakter</span>
              
              <motion.button
                onClick={submitWish}
                disabled={!wish.trim() || isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="w-5 h-5" />
                    </motion.div>
                    Mengirim ke Alam Ajaib...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Kirim Permohonan
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-4 sm:p-6 mb-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
                <span className="text-base sm:text-xl font-bold">Permohonanmu telah dikirim ke alam ajaib! ✨</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Magical Wishes Display */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Permohonan Ajaib</h4>
            <div className="space-y-3">
              {magicalWishes.map((magicalWish, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    <span className="text-gray-700">{magicalWish}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {wishes.length > 0 && (
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">Permohonanmu</h4>
              <div className="space-y-3">
                {wishes.map((userWish, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4 text-left"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-pink-500" fill="currentColor" />
                      <span className="text-gray-700">{userWish}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WishingWell;