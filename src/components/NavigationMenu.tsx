import React from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Camera, Baseline as Timeline, CreditCard, Heart, Camera as PhotoBooth, MessageCircle, Wand2, Sun, Moon } from 'lucide-react';

interface NavigationMenuProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ currentSection, setCurrentSection }) => {
  const menuItems = [
    { id: 'hero', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'countdown', label: 'Countdown', icon: <Clock className="w-5 h-5" /> },
    { id: 'photos', label: 'Gallery', icon: <Camera className="w-5 h-5" /> },
    { id: 'timeline', label: 'Timeline', icon: <Timeline className="w-5 h-5" /> },
    { id: 'card', label: 'Cards', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'love', label: 'Love Test', icon: <Heart className="w-5 h-5" /> },
    { id: 'booth', label: 'Photo Booth', icon: <PhotoBooth className="w-5 h-5" /> },
    { id: 'wishes', label: 'Wishes', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'well', label: 'Wishing Well', icon: <Wand2 className="w-5 h-5" /> }
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 w-full flex flex-row justify-around items-center bg-white/80 backdrop-blur-lg z-50 p-1 sm:top-20 sm:left-4 sm:bottom-auto sm:w-auto sm:flex-col sm:justify-start sm:bg-white/10 sm:backdrop-blur-lg sm:rounded-2xl sm:p-2 shadow-2xl border-t border-white/20 sm:border-t-0 sm:border border-white/20"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {menuItems.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => setCurrentSection(item.id)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-0 sm:mb-2 flex items-center justify-center transition-all duration-300 group relative mx-1 sm:mx-0 ${
            currentSection === item.id
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.1 }}
        >
          {item.icon}
          {/* Tooltip hanya di desktop */}
          <motion.div
            className="hidden sm:block absolute left-16 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
          </motion.div>
        </motion.button>
      ))}
    </motion.nav>
  );
};

export default NavigationMenu;