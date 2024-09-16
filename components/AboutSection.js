// components/AboutSection.js
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import bg2Image from '@/public/bg2.png';
import art2Image from '@/public/art2.png';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Image
        src={bg2Image}
        alt="PWIG Background"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div className="lg:w-1/2" variants={itemVariants}>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white font-['Freckle_Face'] leading-tight mb-8">
              ABOUT $PWIG
            </h2>
            <div className="bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-pink-500/30">
              <div className="text-xl sm:text-2xl text-white leading-relaxed space-y-4 font-['Freckle_Face']">
                <p>From the depths of meme culture,</p>
                <p>A new legend emerges: $PWIG.</p>
                <p>Community-driven, with a clear roadmap.</p>
                <p>$PWIG is the people's coin.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <motion.button
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JOIN THE PWIG SQUAD
              </motion.button>
              <motion.button
                className="bg-white/10 text-white font-bold py-3 px-8 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg text-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                OINK WITH US
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="lg:w-1/2 relative" variants={itemVariants}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src={art2Image}
                alt="PWIG Art"
                fill
                className="object-contain rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
