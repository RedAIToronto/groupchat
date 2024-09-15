'use client';

import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

export default function PwigmapSection() {
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
    <section id="pwigmap" className="py-24 bg-gradient-to-b from-pink-100 to-sky-200 dark:from-pink-900 dark:to-sky-900">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-['Freckle_Face']">PWIGMAP</h2>
        <div className="max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.step}
              className="flex items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-6 shadow-lg">
                <span className="text-white font-bold text-xl">{item.step}</span>
              </div>
              <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-pink-200 dark:border-pink-800">
                <p className="text-xl font-semibold text-gray-800 dark:text-white font-['Freckle_Face']">{item.text}</p>
              </div>
              {item.completed ? (
                <CheckCircle className="flex-shrink-0 w-10 h-10 text-green-500 ml-6" />
              ) : (
                <X className="flex-shrink-0 w-10 h-10 text-red-500 ml-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}