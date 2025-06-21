import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Gift } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to next birthday (you can customize this)
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    targetDate.setMonth(5); // June (0-indexed)
    targetDate.setDate(22); // 22nd
    targetDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-pink-500" />
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Next Birthday
            </h2>
            <Gift className="w-8 h-8 sm:w-12 sm:h-12 text-purple-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Countdown to your next special day! 🎉</p>
        </motion.div>

        {/* Countdown Display */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
        >
          {[
            { label: 'Days', value: timeLeft.days, color: 'from-pink-500 to-rose-500' },
            { label: 'Hours', value: timeLeft.hours, color: 'from-purple-500 to-violet-500' },
            { label: 'Minutes', value: timeLeft.minutes, color: 'from-indigo-500 to-blue-500' },
            { label: 'Seconds', value: timeLeft.seconds, color: 'from-teal-500 to-cyan-500' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              className={`bg-gradient-to-br ${item.color} rounded-3xl p-4 sm:p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
              >
                {item.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-base sm:text-xl font-semibold opacity-90">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Message */}
        <motion.div
          className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Clock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-pink-500" />
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Every Second Counts! ⏰
          </h3>
          <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
            Setiap detik yang berlalu membawa kita lebih dekat ke hari spesialmu berikutnya. 
            Aku sudah tidak sabar untuk merayakan bersama lagi! 💕
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CountdownTimer;