// components/HeroSection.js
'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedTicker from './AnimatedTicker';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-between pt-24 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="https://media.discordapp.net/attachments/1237005495412461569/1284971360531251331/pwig_website.png?ex=66e89255&is=66e740d5&hm=19477f340224d33def6bf389a4a68fc4fa14e00f557f030cd66b723dfa1a5ae7&=&format=webp&quality=lossless&width=1410&height=794"
          alt="PWIG Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iMyIgc2VlZD0iMiIgcmVzdWx0PSJub2lzZSI+PC9mZVR1cmJ1bGVuY2U+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIj48L2ZlQ29sb3JNYXRyaXg+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')]"></div>
      </motion.div>
      
      <div className="flex-grow flex flex-col items-center justify-center z-10">
        <motion.h1
          className="text-[20vw] md:text-[25vw] font-extrabold text-white select-none text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'Freckle Face', cursive",
            textShadow: '4px 4px 0px rgba(0,0,0,0.3), -4px -4px 0px rgba(0,0,0,0.3), 4px -4px 0px rgba(0,0,0,0.3), -4px 4px 0px rgba(0,0,0,0.3)',
            WebkitTextStroke: '2px rgba(0,0,0,0.3)',
            color: 'rgba(255,255,255,0.8)',
            transform: 'rotate(-5deg)',
            letterSpacing: '0.05em',
          }}
        >
          $PWIG
        </motion.h1>
        
        <motion.p
          className="text-2xl md:text-4xl text-white text-center mt-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontFamily: "'Freckle Face', cursive" }}
        >
          The Meme Coin That's Bringing Home the Bacon!
        </motion.p>
      </div>
      
      <div className="w-full mt-auto">
        <AnimatedTicker />
      </div>
      
      {/* Floating PWIG logos */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
          alt="PWIG Logo"
          layout="fill"
          objectFit="contain"
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-20 h-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
          alt="PWIG Logo"
          layout="fill"
          objectFit="contain"
        />
      </motion.div>
    </section>
  );
}
