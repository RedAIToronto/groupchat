'use client';

import { motion } from 'framer-motion';

export default function ReversedAnimatedTicker() {
  const tickerItems = Array(10).fill('$PWIG');

  return (
    <div className="relative py-4 overflow-hidden w-full bg-black bg-opacity-30 backdrop-blur-sm">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {tickerItems.concat(tickerItems).map((item, index) => (
          <motion.span
            key={index}
            className="text-pink-300 text-4xl md:text-5xl font-extrabold mx-8"
            style={{
              fontFamily: "'Freckle Face', cursive",
              textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,105,180,0.5)',
            }}
            whileHover={{ scale: 1.1, rotate: [-2, 2] }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}