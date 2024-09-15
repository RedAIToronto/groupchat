// components/Header.js
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Map } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import PwigmapPopup from './PwigmapPopup';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPwigmapOpen, setIsPwigmapOpen] = useState(false);
  const router = useRouter();
  const contractAddress = "TBD"; // Placeholder for the contract address

  const navigationIcons = [
    { name: 'Twitter', href: '#', src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png', size: 18 },
    { name: 'Telegram', href: '#', src: '/image.png', size: 22 },
    { name: 'Chart', href: '#', src: 'https://cdn.prod.website-files.com/6421d264d066fd2b24b91b20/661375b92a7e161501f4b5e5_dexscreener.322a5a2d.png', size: 22 },
  ];

  const scrollToPwigmap = () => {
    const pwigmapSection = document.getElementById('pwigmap');
    if (pwigmapSection) {
      pwigmapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/roadmap') {
        setIsPwigmapOpen(true);
      } else {
        setIsPwigmapOpen(false);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const openPwigmapPopup = useCallback(() => {
    console.log('Opening Pwigmap');
    setIsPwigmapOpen(true);
    setIsMobileMenuOpen(false);
  }, []);

  const handleClosePwigmap = useCallback(() => {
    console.log('Closing Pwigmap');
    setIsPwigmapOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top bar with contract address */}
        <div className="bg-white border-b border-black py-1 px-4 text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/pump.png"
              alt="Pump Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <p className="text-black text-sm font-mono">Contract: {contractAddress}</p>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg shadow-md transition-colors duration-300">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="#hero" aria-label="PWIG Home" className="flex items-center">
              <div className="relative w-12 h-12 border-2 border-pink-500 rounded-full overflow-hidden">
                <Image
                  src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
                  alt="PWIG Logo"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <span className="ml-3 text-2xl font-bold text-white font-['Freckle_Face']">PWIG</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationIcons.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-pink-300 hover:text-pink-500 transition-colors"
                  aria-label={item.name}
                >
                  <div className="w-10 h-10 relative rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={item.size}
                      height={item.size}
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
              <button
                onClick={openPwigmapPopup}
                className="text-pink-300 hover:text-pink-500 transition-colors"
                aria-label="Pwigmap"
              >
                <div className="w-10 h-10 relative rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden">
                  <Map size={22} />
                </div>
              </button>
              <button className="bg-white text-black font-bold py-2 px-6 rounded-full border-2 border-pink-500 hover:bg-pink-100 transition-colors">
                <span className="text-sm tracking-wider font-['Freckle_Face']">BUY PWIG</span>
              </button>
              <ThemeToggle />
            </nav>
            
            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                className="ml-2 text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-black bg-opacity-30 backdrop-blur-lg">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navigationIcons.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-pink-300 hover:text-pink-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={item.name}
                  >
                    <div className="w-10 h-10 relative rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.name}
                        width={item.size}
                        height={item.size}
                        className="object-contain"
                      />
                    </div>
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={openPwigmapPopup}
                  className="text-pink-300 hover:text-pink-500 transition-colors"
                  aria-label="Pwigmap"
                >
                  <div className="w-10 h-10 relative rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden">
                    <Map size={22} />
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        )}
        
        {isPwigmapOpen && (
          <PwigmapPopup onClose={handleClosePwigmap} />
        )}
      </header>
    </>
  );
}
