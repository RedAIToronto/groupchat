// components/HowToBuySection.js
'use client';

import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReversedAnimatedTicker from './ReversedAnimatedTicker';
import { useState } from 'react';

export default function HowToBuySection() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "TBD"; // Dummy Solana address

  const steps = [
    {
      title: "Set Up Phantom Wallet",
      desc: "Install Phantom, the user-friendly Solana wallet. Your gateway to $PWIG awaits!",
      icon: "https://shawk.xyz/wp-content/uploads/2024/09/White-Ghost_docs_nu.svg",
    },
    {
      title: "Acquire Solana (SOL)",
      desc: "Get SOL from top exchanges. Transfer it to Phantom and prepare for $PWIG!",
      icon: "https://shawk.xyz/wp-content/uploads/2024/09/630e1828d8d76.png",
    },
    {
      title: "Swap SOL for $PWIG",
      desc: "Visit pump.fun, connect Phantom, and swap SOL for $PWIG. Join the oink revolution!",
      icon: "https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <ReversedAnimatedTicker />
      <section id="how-to-buy" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://media.discordapp.net/attachments/1237005495412461569/1284971360531251331/pwig_website.png?ex=66e89255&is=66e740d5&hm=19477f340224d33def6bf389a4a68fc4fa14e00f557f030cd66b723dfa1a5ae7&=&format=webp&quality=lossless&width=1410&height=794"
            alt="PWIG Banner"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/70 to-pink-500/70 dark:from-sky-700/70 dark:to-pink-900/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-6xl font-bold mb-16 text-center text-white dark:text-pink-300 font-['Freckle_Face'] drop-shadow-lg">How to Buy $PWIG</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-20 dark:bg-opacity-10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl transform transition-all hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-8">
                  <Image src={step.icon} alt={step.title} width={80} height={80} />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-center text-white dark:text-pink-300 font-['Freckle_Face']">{step.title}</h3>
                <p className="text-center text-white dark:text-pink-200 text-lg font-semibold">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Contract Address Section */}
          <motion.div 
            className="mt-24 bg-white bg-opacity-10 dark:bg-opacity-5 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-pink-300/30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Logo"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-pink-500"
                />
                <CheckCircle className="absolute -bottom-2 -right-2 text-green-400 bg-white rounded-full" size={24} />
              </div>
              <h3 className="text-4xl font-bold ml-4 text-white dark:text-pink-300 font-['Freckle_Face']">OFFICIAL $PWIG CONTRACT</h3>
            </div>
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-1">
              <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-xl p-4 border border-pink-300/50">
                <div className="flex items-center space-x-4 flex-grow">
                  <span className="text-pink-500 dark:text-pink-300 font-semibold">Contract:</span>
                  <code className="text-gray-700 dark:text-gray-300 text-lg font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg flex-grow">{contractAddress}</code>
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-4 py-2 ml-4 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
                  aria-label="Copy contract address"
                >
                  <Copy size={20} className="mr-2" />
                  <span>Copy</span>
                </Button>
              </div>
            </div>
            {copied && (
              <motion.p 
                className="text-green-400 text-center mt-4 font-bold text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                Oink! Address copied to clipboard!
              </motion.p>
            )}
          </motion.div>
          <div className="mt-24 h-24 bg-gradient-to-b from-transparent to-brown-900"></div>
        </div>
      </section>
    </>
  );
}
