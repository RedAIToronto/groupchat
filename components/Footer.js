// components/Footer.js
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const navigationIcons = [
    { name: 'Twitter', href: '#', src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png', size: 18 },
    { name: 'Telegram', href: '#', src: '/image.png', size: 22 },
    { name: 'Chart', href: '#', src: 'https://cdn.prod.website-files.com/6421d264d066fd2b24b91b20/661375b92a7e161501f4b5e5_dexscreener.322a5a2d.png', size: 22 },
  ];

  return (
    <footer className="bg-brown-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="#hero" aria-label="PWIG Home" className="flex items-center mb-4 md:mb-0">
            <Image
              src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
              alt="PWIG Logo"
              width={48}
              height={48}
              className="mr-3"
            />
            <span className="text-2xl font-bold text-white font-['Freckle_Face']">PWIG</span>
          </Link>
          
          <nav className="flex items-center space-x-6 mb-4 md:mb-0">
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
          </nav>

          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-sm text-brown-300 font-['Freckle_Face']">© 2024 $PWIG. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
