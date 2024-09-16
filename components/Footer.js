// components/Footer.js
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import PwigmapPopup from './PwigmapPopup';

// At the top of the file, add these constants
const CONTRACT_ADDRESS = "Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump";
const BUY_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump&fixed=in";

export default function Footer() {
  const [isPwigmapOpen, setIsPwigmapOpen] = useState(false);
  const router = useRouter();

  const navigationIcons = [
    { name: 'Twitter', href: 'https://x.com/solpwig', src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png', size: 18 },
    { name: 'Telegram', href: 'https://t.me/pwigportal', src: '/image.png', size: 22 },
    { name: 'Chart', href: 'https://t.me/pwigportal', src: 'https://cdn.prod.website-files.com/6421d264d066fd2b24b91b20/661375b92a7e161501f4b5e5_dexscreener.322a5a2d.png', size: 22 },
  ];

  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'How to Buy', href: '#how-to-buy' },
    { name: 'Roadmap', onClick: () => handleOpenPwigmap() },
  ];

  const handleOpenPwigmap = useCallback(() => {
    setIsPwigmapOpen(true);
    router.push('/roadmap', undefined, { shallow: true });
  }, [router]);

  const handleClosePwigmap = useCallback(() => {
    setIsPwigmapOpen(false);
    router.push('/', undefined, { shallow: true });
  }, [router]);

  return (
    <footer className="bg-gradient-to-b from-brown-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="PWIG Home" className="flex items-center mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Logo"
                  width={60}
                  height={60}
                  className="mr-3 rounded-full border-2 border-pink-500"
                />
              </motion.div>
              <span className="text-3xl font-bold text-white font-['Freckle_Face']">PWIG</span>
            </Link>
            <p className="text-sm text-brown-300 mt-2 text-center md:text-left font-medium">
              Revolutionizing crypto with a snout for opportunity and a tail for fun!
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 font-['Freckle_Face']">Quick Links</h3>
            <nav className="flex flex-wrap justify-center gap-4">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className="text-brown-300 hover:text-pink-500 transition-colors cursor-pointer font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xl font-bold mb-4 font-['Freckle_Face']">Connect With Us</h3>
            <div className="flex items-center space-x-4">
              {navigationIcons.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-300 hover:text-pink-500 transition-colors"
                  aria-label={item.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 relative rounded-full bg-white border-2 border-pink-500 flex items-center justify-center overflow-hidden shadow-lg">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={item.size}
                      height={item.size}
                      className="object-contain"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-brown-700 text-center">
          <p className="text-sm text-brown-300 font-['Freckle_Face'] font-medium">
            © 2024 $PWIG. All rights reserved. | Designed with 🐽 by the PWIG team
          </p>
          <p className="text-xs text-brown-400 mt-2 italic font-medium leading-relaxed">
            Disclaimer: Not Financial Advice (NFA). $PWIG is for entertainment purposes only. 
            Invest at your own risk, and always DYOR (Do Your Own Research). 
            Remember, pigs can't fly, but $PWIG might just make your portfolio soar!
          </p>
        </div>
      </div>
      {isPwigmapOpen && <PwigmapPopup onClose={handleClosePwigmap} />}
      <motion.a
        href={BUY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full hover:from-pink-600 hover:to-purple-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm tracking-wider font-['Freckle_Face']">BUY $PWIG</span>
      </motion.a>
    </footer>
  );
}
