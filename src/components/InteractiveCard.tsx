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
    >
      <div
        className="w-full sm:w-80 md:w-96 h-96 cursor-pointer [perspective:1000px]"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]',
            isFlipped && '[transform:rotateY(180deg)]'
          )}
        >
          {/* Sisi Depan */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl shadow-2xl">
            <div className={`flex flex-col items-center justify-center p-6 text-white text-center h-full w-full rounded-2xl bg-gradient-to-br ${card.gradient}`}>
              <h3 className="text-3xl font-bold">{card.front.title}</h3>
              <p className="text-xl mt-2">{card.front.subtitle}</p>
            </div>
          </div>

          {/* Sisi Belakang */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-2xl">
             <div className="p-6 bg-white flex flex-col h-full w-full rounded-2xl">
              <div className="flex-grow">
                <h3 className="text-xl text-gray-800 font-semibold mb-4 text-center">
                  {card.back.greeting}
                </h3>
                <p className="text-base leading-relaxed text-gray-600">
                  {card.back.message}
                </p>
              </div>
              <div className="text-right">
                <p className="text-pink-500 font-semibold italic text-lg">
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
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 py-20">
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Three Cards, One Message
        </h2>
        <p className="text-lg sm:text-xl text-gray-600">Klik salah satu kartu untuk membaca pesan spesial 💌</p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {cardData.map((card, index) => (
          <CSSFlipCard 
            key={index} 
            card={card} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};

export default InteractiveCard;
