import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.div
      className="fixed top-4 left-4 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode 
            ? 'bg-yellow-400 text-gray-900' 
            : 'bg-gray-800 text-yellow-400'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default ThemeToggle;