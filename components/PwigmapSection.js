'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, ChevronRight, Users, Rocket, TrendingUp, Zap, Globe, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PwigmapSection() {
  const [expandedStep, setExpandedStep] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if there's a stage-step parameter in the URL
    const { stage, step } = router.query;
    if (stage && step) {
      setExpandedStep(`${stage}-${step}`);
    }
  }, [router.query]);

  const roadmapItems = [
    {
      stage: 1,
      title: "Launch & Initial Growth",
      items: [
        { title: "pump.fun Launch", description: "Official launch of the pump.fun platform, introducing $PWIG to the world.", completed: true, icon: Rocket },
        { title: "Dexscreener Update", description: "Integration of banner and social links on Dexscreener for improved visibility.", completed: false, icon: TrendingUp },
        { title: "Raydium Migration", description: "Automatic migration from pump.fun to Raydium DEX after completing the bonding curve.", completed: false, icon: TrendingUp },
        { title: "DEX Ads Campaign", description: "Targeted advertising campaigns on Dexscreener, Dextools, and other platforms.", completed: false, icon: TrendingUp },
      ]
    },
    {
      stage: 2,
      title: "Community Expansion & Visibility",
      items: [
        { title: "Raids & Community Building", description: "Organizing community raids and events to boost engagement and growth.", completed: false, icon: Users },
        { title: "Moontok Listing", description: "Strategic listing on Moontok to expand reach and accessibility.", completed: false, icon: Globe },
        { title: "Dexscreener 10x Boost", description: "Major push to increase Dexscreener metrics by 10x, enhancing market presence.", completed: false, icon: Zap },
        { title: "Soltrending Listing", description: "Integration with Soltrending for increased visibility in the Solana ecosystem.", completed: false, icon: TrendingUp },
      ]
    },
    {
      stage: 3,
      title: "Mainstream Recognition & Growth",
      items: [
        { title: "CoinGecko Listing", description: "Official listing on CoinGecko for wider market exposure and credibility.", completed: false, icon: Globe },
        { title: "CoinMarketCap Listing", description: "Milestone listing on CoinMarketCap, solidifying $PWIG's market position.", completed: false, icon: Globe },
        { title: "KOL Onboarding", description: "Partnering with Key Opinion Leaders to amplify $PWIG's message and reach.", completed: false, icon: Users },
        { title: "Social Media Expansion", description: "Launch of TikTok and Instagram Reels campaigns to onboard mainstream users.", completed: false, icon: Video },
      ]
    },
  ];

  const handleStepClick = (e, stageIndex, index) => {
    e.preventDefault();
    e.stopPropagation();
    const newExpandedStep = `${stageIndex}-${index}`;
    setExpandedStep(prevStep => prevStep === newExpandedStep ? null : newExpandedStep);
  };

  return (
    <div className="pwigmap-content relative z-10">
      {roadmapItems.map((stage, stageIndex) => (
        <div key={stage.stage} className="mb-12">
          <h3 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4 font-['Freckle_Face']">
            Stage {stage.stage}: {stage.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stage.items.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (stageIndex * 4 + index) * 0.1 }}
              >
                <motion.div
                  className={`bg-white/80 dark:bg-gray-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${item.completed ? 'border-green-400' : 'border-pink-400'}`}
                  whileHover={{ scale: 1.03 }}
                  onClick={(e) => handleStepClick(e, stageIndex, index)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white font-['Freckle_Face'] flex items-center">
                      <item.icon className="w-5 h-5 mr-2 text-pink-500" />
                      {item.title}
                    </h4>
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-400' : 'bg-pink-400'}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Clock className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: expandedStep === `${stageIndex}-${index}` ? 1 : 0, height: expandedStep === `${stageIndex}-${index}` ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-gray-600 dark:text-gray-300 mt-2 overflow-hidden"
                  >
                    {item.description}
                  </motion.p>
                  <motion.div
                    className="mt-2 flex justify-end items-center text-pink-500 dark:text-pink-400"
                    animate={{ rotate: expandedStep === `${stageIndex}-${index}` ? 90 : 0 }}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}