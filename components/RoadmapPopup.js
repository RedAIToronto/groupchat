'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

export default function RoadmapPopup({ onClose }) {
  const roadmapItems = [
    { step: 1, text: "pump.fun Launch", completed: false },
    { step: 2, text: "Dexscreener Update", completed: false },
    { step: 3, text: "Raydium Listing", completed: false },
    { step: 4, text: "Dexscreener Ads", completed: false },
    { step: 5, text: "Dexscreener Boost 10x", completed: false },
    { step: 6, text: "Moontok Listing", completed: false },
    { step: 7, text: "Raiding and Community Building", completed: false },
    { step: 8, text: "CoinGecko Listing", completed: false },
    { step: 9, text: "CoinMarketCap Listing", completed: false },
    { step: 10, text: "To New Heights", completed: false },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-['Freckle_Face']">PWIGMAP</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6">
          {roadmapItems.map((item) => (
            <div key={item.step} className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold">{item.step}</span>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800 dark:text-white font-['Freckle_Face']">{item.text}</p>
              </div>
              {item.completed ? (
                <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500 ml-4" />
              ) : (
                <X className="flex-shrink-0 w-6 h-6 text-red-500 ml-4" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}