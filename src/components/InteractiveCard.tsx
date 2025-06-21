import { useState } from 'react';
import { motion } from 'framer-motion';

// Data untuk semua kartu
const cardData = [
  {
    front: {
      title: "Happy Birthday!",
      subtitle: "Sweet Seventeen",
    },
    back: {
      greeting: "Selamat ulang tahun!",
      message: "Semoga hari ini dan tahun-tahun mendatang dipenuhi dengan kebahagiaan, cinta, dan semua hal indah yang kamu impikan. Kamu adalah hadiah terindah dalam hidup acuuu! 💕",
      signature: "With all my love -parker❤️"
    },
    gradient: "from-pink-400 to-rose-500"
  },
  {
    front: {
      title: "You're My Queen",
      subtitle: "Forever & Always",
    },
    back: {
      greeting: "To My Queen,",
      message: "You're not just my girlfriend — you're the queen of my world. Being with you feels like living a fairytale, but real. Thanks for being part of my life. 👑",
      signature: "With All My Love,"
    },
    gradient: "from-purple-400 to-indigo-500"
  },
  {
    front: {
      title: "My Shining Star",
      subtitle: "You Light Up My World",
    },
    back: {
      greeting: "Hey Sunshine,",
      message: "Happy Sweet 17! Hope your day is as bright and beautiful as your smile. You deserve all the happiness in the world. 💖",
      signature: "Forever yours,"
    },
    gradient: "from-yellow-400 to-orange-500"
  }
];

const CSSFlipCard = ({ card, index }: { card: typeof cardData[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Fungsi `cn` seperti di artikel untuk menggabungkan kelas secara kondisional
  const cn = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[420px] cursor-pointer [perspective:1000px] mx-auto touch-manipulation"
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Flip card ${index + 1} to read message`}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:scale-105 active:scale-95',
            isFlipped && '[transform:rotateY(180deg)]'
          )}
        >
          {/* Sisi Depan */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/20">
            <div className={`flex flex-col items-center justify-center p-4 sm:p-6 text-white text-center h-full w-full rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
              {/* Decorative elements */}
              <div className="absolute top-2 right-2 opacity-20">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
              </div>
              <div className="absolute bottom-2 left-2 opacity-20">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight relative z-10">
                {card.front.title}
              </h3>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3 opacity-90 relative z-10">
                {card.front.subtitle}
              </p>
            </div>
          </div>

          {/* Sisi Belakang */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200">
             <div className="p-4 sm:p-6 bg-white flex flex-col h-full w-full rounded-xl sm:rounded-2xl relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200"></div>
              </div>
              
              <div className="flex-grow relative z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold mb-3 sm:mb-4 text-center leading-tight">
                  {card.back.greeting}
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 text-center sm:text-left">
                  {card.back.message}
                </p>
              </div>
              <div className="text-center sm:text-right mt-4 sm:mt-6 relative z-10">
                <p className="text-pink-500 font-semibold italic text-base sm:text-lg md:text-xl">
                  {card.back.signature}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const InteractiveCard = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 lg:p-12 py-16 sm:py-20 md:py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <motion.div
        className="text-center mb-8 sm:mb-12 md:mb-16 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
          Three Cards, One Message
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Klik salah satu kartu untuk membaca pesan spesial 💌
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-4">
        {cardData.map((card, index) => (
          <CSSFlipCard 
            key={index} 
            card={card} 
            index={index} 
          />
        ))}
      </div>

      {/* Responsive hint untuk mobile */}
      <motion.div
        className="mt-8 sm:hidden text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-xs text-gray-500 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-sm">
          💡 Tap kartu untuk membalik
        </p>
      </motion.div>

      {/* Desktop hint */}
      <motion.div
        className="mt-8 hidden sm:block text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="text-sm text-gray-500 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-sm">
          💡 Click kartu untuk membalik
        </p>
      </motion.div>
    </section>
  );
};

export default InteractiveCard;
