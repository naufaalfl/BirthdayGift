import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { photos } from '../data/photos';

// Helper function to shuffle array
const shuffle = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const PhotoMarquee = ({ photos, direction = 'left' }: { photos: any[], direction?: 'left' | 'right' }) => {
  const duplicatedPhotos = [...photos, ...photos];
  const duration = duplicatedPhotos.length * 5; // Adjust speed here

  return (
    <div className="flex">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-100%'] : ['-100%', '0%'],
        }}
        transition={{
          ease: 'linear',
          duration: duration,
          repeat: Infinity,
        }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <img key={index} src={photo.src} className="h-48 w-auto mx-2 rounded-lg object-cover" />
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  // Ambil 4 foto secara acak untuk ditampilkan di Momen Pilihan
  const featuredPhotos = photos.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-2 sm:px-4 py-16 text-white overflow-hidden">
      {/* Background Photo Marquee */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-around h-full py-4 space-y-4">
          <PhotoMarquee photos={shuffle(photos).slice(0, 10)} direction="left" />
          <PhotoMarquee photos={shuffle(photos).slice(0, 10)} direction="right" />
          <PhotoMarquee photos={shuffle(photos).slice(0, 10)} direction="left" />
          <PhotoMarquee photos={shuffle(photos).slice(0, 10)} direction="right" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}

      <div className="text-center z-10 max-w-screen-sm sm:max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white drop-shadow-lg mb-4">
            Sweet
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white drop-shadow-lg">
            Seventeen
          </h1>
        </div>

        {/* Birthday Message */}
        <div className="bg-black/20 backdrop-blur-md rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/30 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-pink-300 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Happy Birthday!</h2>
            <Heart className="w-8 h-8 text-pink-300 animate-pulse" />
          </div>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
            Caaaamaaat Uyaaang Cauun yaa Cayaaang nya Acuu
          </p>
          
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          17.
Bukan sekadar angka. Tapi titik baru buat jadi versi terbaik dari diri sendiri.

Selamat ulang tahun.
Semoga bahagia ga cuma datang pas dirayain, tapi tinggal lebih lama dari yang kamu harapkan.

Tetap tumbuh, tetap tangguh.
Dunia belum siap lihat kamu bersinar sepenuhnya.
          </p>

          {/* Age Display */}
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-full text-lg sm:text-2xl font-bold shadow-lg">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>17 Years of Amazing</span>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Featured Photos Section */}
      <div className="z-10 w-full max-w-4xl mx-auto mt-12 mb-24 sm:mb-12 animate-fade-in-up">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Momen Pilihan Kita</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredPhotos.map((photo, index) => (
            <div key={index} className="group aspect-square overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-white/20">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <p className="text-white text-xs font-semibold">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full mx-auto">
          <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse"></div>
        </div>
        <p className="text-white mt-2 text-xs sm:text-base">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;