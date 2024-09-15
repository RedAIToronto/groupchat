// components/AboutSection.js
'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const firstImageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4, 1], [1, 1, 0, 0]);
  const secondImageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5, 1], [0, 0, 1, 1]);
  const textHighlight = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://media.discordapp.net/attachments/1237005495412461569/1284971360531251331/pwig_website.png?ex=66e89255&is=66e740d5&hm=19477f340224d33def6bf389a4a68fc4fa14e00f557f030cd66b723dfa1a5ae7&=&format=webp&quality=lossless&width=1410&height=794"
          alt="PWIG Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-200/70 to-sky-400/70 dark:via-pink-900/70 dark:to-sky-700/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-96 h-96 mx-auto">
              <motion.div
                style={{ opacity: firstImageOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284638301273198712/1.png?ex=66e804e6&is=66e6b366&hm=b3eb6c962261f1eca60389d7462765c94b0b390d1967f6e469204cb2cbc76a7e&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Meme"
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="rounded-2xl shadow-2xl border-4 border-pink-500"
                />
              </motion.div>
              <motion.div
                style={{ opacity: secondImageOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284638303391453255/3.png?ex=66e804e6&is=66e6b366&hm=e9625a04be4cc5cf0ab8170491a2e9adf836c98038a1832589769d8c1d652d0b&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Gulping Candles"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-2xl shadow-2xl border-4 border-green-500"
                />
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-['Freckle_Face']">ABOUT $PWIG</h2>
            <div className="bg-gradient-to-br from-white via-pink-100 to-sky-100 dark:from-gray-800 dark:via-pink-900 dark:to-sky-900 p-8 rounded-xl shadow-2xl backdrop-blur-lg">
              <p className="text-xl mb-8 text-pink-900 dark:text-pink-100 leading-relaxed font-semibold">
                $PWIG trots through the crypto market with a snout for opportunity, sniffing out the juiciest gains. 
                <motion.span 
                  className="relative inline-block"
                  style={{ 
                    background: useTransform(
                      textHighlight, 
                      [0, 1],
                      ['linear-gradient(to right, transparent 0%, transparent 100%)', 'linear-gradient(to right, #4ade80 0%, #4ade80 100%)']
                    )
                  }}
                >
                  <span className="relative z-10">With each "owink," it gobbles up green candles and turns bearish trends into delicious slop.</span>
                </motion.span>
                Join the sty-lish revolution and watch your portfolio go hog wild in the digital pigpen!
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.button
                  className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full border-2 border-white hover:bg-pink-600 transition-colors flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg tracking-wider font-['Freckle_Face']">BUY $PWIG</span>
                </motion.button>
                <motion.button
                  className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full border-2 border-pink-500 hover:bg-pink-100 transition-colors flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/4926/4926616.png"
                    alt="Telegram"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
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
