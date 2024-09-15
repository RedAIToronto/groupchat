// components/AboutSection.js
'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import bg2Image from '@/public/bg2.png';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg2Image}
          alt="PWIG Background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 relative"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="https://media.discordapp.net/attachments/1237005495412461569/1284638301273198712/1.png?ex=66e804e6&is=66e6b366&hm=b3eb6c962261f1eca60389d7462765c94b0b390d1967f6e469204cb2cbc76a7e&=&format=webp&quality=lossless&width=1254&height=1254"
                alt="PWIG Meme"
                layout="fill"
                objectFit="contain"
                priority
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            style={{ opacity: textOpacity }}
          >
            <div className="flex items-center mb-8">
              <div className="relative w-20 h-20 mr-6 border-4 border-pink-500 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Logo"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <h2 className="text-5xl sm:text-6xl font-extrabold text-white font-['Freckle_Face'] leading-tight">ABOUT $PWIG</h2>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-pink-500/30">
              <p className="text-lg sm:text-xl mb-8 text-white leading-relaxed">
                $PWIG is revolutionizing the crypto market with its unique blend of humor and innovation. Our porcine-inspired token combines cutting-edge blockchain technology with a playful approach to finance, creating a community-driven ecosystem that's as fun as it is profitable.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg tracking-wider font-['Freckle_Face']">BUY $PWIG</span>
                </motion.button>
                <motion.button
                  className="bg-white/10 text-white font-bold py-3 px-8 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span className="text-lg tracking-wider font-['Freckle_Face']">JOIN COMMUNITY</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
