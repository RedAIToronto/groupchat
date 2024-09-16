// components/HowToBuySection.js
'use client';

import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ReversedAnimatedTicker from './ReversedAnimatedTicker';
import { useState, useEffect } from 'react';

// At the top of the file, update these constants
const CONTRACT_ADDRESS = "Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump";
const BUY_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump&fixed=in";

export default function HowToBuySection() {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Set Up Phantom Wallet",
      desc: "Install Phantom, the user-friendly Solana wallet. Your gateway to $PWIG awaits!",
      icon: "https://shawk.xyz/wp-content/uploads/2024/09/White-Ghost_docs_nu.svg",
      link: "https://phantom.app/",
    },
    {
      title: "Acquire Solana (SOL)",
      desc: "Get SOL from top exchanges. Transfer it to Phantom and prepare for $PWIG!",
      icon: "https://shawk.xyz/wp-content/uploads/2024/09/630e1828d8d76.png",
      link: "https://www.coinbase.com/how-to-buy/solana",
    },
    {
      title: "Swap SOL for $PWIG",
      desc: "Visit the official swap page, connect Phantom, and swap SOL for $PWIG. Join the oink revolution!",
      icon: "https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254",
      link: BUY_LINK,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => setActiveStep((prevStep) => (prevStep + 1) % steps.length);
  const prevStep = () => setActiveStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);

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
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/70 to-pink-500/70 dark:from-sky-700/70 dark:to-pink-900/70 mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-6xl font-bold mb-16 text-center text-white dark:text-pink-300 font-['Freckle_Face'] drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How to Buy $PWIG
          </motion.h2>
          
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex items-center justify-center gap-8 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 backdrop-blur-lg p-4 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${activeStep === index ? 'border-4 border-pink-500 scale-110' : 'border border-pink-300/30'}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image src={step.icon} alt={step.title} width={60} height={60} className="rounded-full" />
                </motion.div>
              ))}
            </div>
            <div className="w-full max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
                >
                  <h3 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-pink-300 font-['Freckle_Face']">{steps[activeStep].title}</h3>
                  <p className="text-center text-gray-700 dark:text-pink-200 text-lg font-semibold mb-6">{steps[activeStep].desc}</p>
                  <motion.a
                    href={steps[activeStep].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3 transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">Learn More</span>
                    <ExternalLink size={18} />
                  </motion.a>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-between w-full max-w-3xl mt-8">
              <Button onClick={prevStep} className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2">
                <ArrowLeft size={24} />
              </Button>
              <Button onClick={nextStep} className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2">
                <ArrowRight size={24} />
              </Button>
            </div>
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
                  <code className="text-gray-700 dark:text-gray-300 text-lg font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg flex-grow">{CONTRACT_ADDRESS}</code>
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
            <AnimatePresence>
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
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
