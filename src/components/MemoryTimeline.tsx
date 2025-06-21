import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Camera, Music, MapPin, Coffee } from 'lucide-react';

const MemoryTimeline = () => {
  const memories = [
    {
      date: "Juni 2024",
      title: "Momen Pertama",
      description: "Video ini adalah awal dari segalanya. Momen di mana aku tahu kamu adalah seseorang yang aku mau Halza!.",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      image: "/WhatsApp Video 2025-06-22 at 02.10.00_97c0f63b.mp4"
    },
    {
      date: "i dont remember sayang 2024",
      title: "Date Pertama",
      description: "Kafe kecil di sudut kota, ngobrol sampai lupa waktu. Aku tahu saat itu kamulah orangnya.",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      image: "/WhatsApp Image 2025-06-22 at 02.16.43_9228a504.jpg"
    },
    {
      date: "tiap kali deh 2024",
      title: "Togetherrr!!!",
      description: "Petualangan pertama kita berdua. Setiap langkah terasa seperti mimpi yang jadi kenyataan.",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      image: "/WhatsApp Image 2025-06-22 at 02.33.36_2ef28c49.jpg"
    },
    {
      date: "June 2024",
      title: "Konser Musik",
      description: "Mendengarkan musik favorit bersama. Saat itu aku tahu kita punya banyak kesamaan.",
      icon: <Music className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500",
      image: "/WhatsApp Image 2025-06-22 at 02.05.44_23742d18.jpg"
    },
    {
      date: "gainget pokonya 2024",
      title: "Foto Session",
      description: "Mengabadikan momen indah kita. Setiap foto menyimpan cerita yang tak terlupakan.",
      icon: <Camera className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      image: "/IMG-20250622-WA0014.jpg"
    },
    {
      date: "Sekarang",
      title: "Sweet Seventeen",
      description: "Hari spesialmu yang ke-17. Semoga ini menjadi awal dari petualangan baru yang lebih indah lagi yaa sayaaang.",
      icon: <Star className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      image: "/VID-20250622-WA0001.mp4"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Love Story
          </h2>
          <p className="text-2xl text-gray-600">Perjalanan indah kita dari awal hingga sekarang 💕</p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 rounded-full sm:transform sm:-translate-x-1/2"></div>

          {memories.map((memory, index) => (
            <motion.div
              key={index}
              className="relative flex items-center mb-12"
              variants={itemVariants}
            >
              {/* Desktop-only Spacer */}
              <div className={`hidden sm:block w-5/12 ${index % 2 === 0 ? 'pr-8' : 'order-2 pl-8'}`}></div>

              {/* Node (Icon) */}
              <div className={`z-10 absolute left-6 sm:left-1/2 transform -translate-x-1/2 ${index % 2 !== 0 ? 'sm:order-1' : ''}`}>
                <motion.div
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${memory.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {memory.icon}
                </motion.div>
              </div>

              {/* Content */}
              <div className="w-full sm:w-5/12 pl-16 sm:pl-0 sm:pr-8 sm:text-left">
                 <motion.div
                  className={`bg-white/20 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-xl border border-white/30 w-full ${index % 2 !== 0 ? 'sm:order-2 sm:text-right' : 'sm:text-left'}`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs sm:text-sm text-gray-500 mb-2">{memory.date}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">{memory.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{memory.description}</p>
                  
                  {/* Memory Image or Video */}
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-black">
                    {memory.image.endsWith('.mp4') ? (
                      <video
                        src={memory.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        Browser Anda tidak mendukung tag video.
                      </video>
                    ) : (
                      <img
                        src={memory.image}
                        alt={memory.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Future Plans */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">What's Next? 🚀</h3>
            <p className="text-xl leading-relaxed">
              Ini baru permulaan dari cerita kita. Masih banyak petualangan, kenangan indah, 
              dan momen spesial yang akan kita buat bersama. Aku tidak sabar untuk menulis 
              chapter selanjutnya dari love story kita! 💕✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryTimeline;