import React, { useState } from 'react';
import { Heart, Star, Gift, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WishesSection = () => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [submittedWishes, setSubmittedWishes] = useState([
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Cinta yang Tak Terbatas",
      message: "Semoga cinta kita terus tumbuh dan berkembang setiap harinya. Kamu adalah belahan jiwa yang selalu aku cari."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Mimpi yang Terwujud",
      message: "Semoga semua impian dan cita-citamu dapat terwujud. Aku akan selalu mendukungmu dalam setiap langkah."
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      title: "Kebahagiaan Berlimpah",
      message: "Semoga hidupmu selalu dipenuhi dengan kebahagiaan, tawa, dan momen-momen indah yang tak terlupakan."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
      title: "Masa Depan Cerah",
      message: "Semoga masa depan kita berdua penuh dengan petualangan seru dan kenangan indah yang akan kita buat bersama."
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !wish) return; // Mencegah submit kosong

    setIsSubmitting(true);

    const newWish = {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: name,
      message: wish,
    };

    setTimeout(() => {
      setSubmittedWishes([newWish, ...submittedWishes]);
      setName('');
      setWish('');
      setIsSubmitting(false);
    }, 1000); // Simulasi proses pengiriman
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-rose-500" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-rose-500 to-orange-600 bg-clip-text text-transparent">
              Wishes & Dreams
            </h2>
            <Star className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Tinggalkan ucapan dan harapanmu di sini! ✨</p>
        </motion.div>

        {/* Wishes Form & Display */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Form */}
          <motion.div
            className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Tulis Ucapanmu</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none text-base sm:text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">Ucapan & Harapan</label>
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Tulis ucapanmu di sini..."
                  className="w-full h-32 px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none resize-none text-base sm:text-lg"
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
              </motion.button>
            </form>
          </motion.div>

          {/* Display */}
          <motion.div
            className="h-96 lg:h-auto overflow-y-auto p-4 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <AnimatePresence>
              {submittedWishes.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  layout
                >
                  <p className="text-gray-600 mb-2 text-sm sm:text-base">"{item.message}"</p>
                  <p className="text-right font-bold text-rose-800 text-sm sm:text-base">- {item.title}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;