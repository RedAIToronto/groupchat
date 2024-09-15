import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Share2 } from 'lucide-react';
import PwigmapSection from './PwigmapSection';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PwigmapPopup({ onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log('PwigmapPopup mounted');
  }, []);

  const handleClose = () => {
    console.log('handleClose called');
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const shareRoadmap = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PWIG Roadmap',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Roadmap URL copied to clipboard!');
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    }
  };

  const content = (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-sky-200 dark:from-pink-900 dark:via-purple-900 dark:to-sky-900 rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] relative overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 bg-black bg-opacity-50 backdrop-blur-md p-4 flex justify-between items-center z-20">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src="https://media.discordapp.net/attachments/1237005495412461569/1284621494697332839/pwig_logo.png?ex=66e7f53f&is=66e6a3bf&hm=d5ea9cf9a4da512d57f7463372d42cb74981830f80ddddb4894012da26ccd0ec&=&format=webp&quality=lossless&width=1254&height=1254"
              alt="PWIG Logo"
              width={48}
              height={48}
              className="rounded-full border-2 border-pink-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1">
              <MapPin size={16} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-['Freckle_Face']">
              PWIG Roadmap
            </h2>
            <p className="text-white text-sm mt-1">Oinking our way to the moon, one milestone at a time!</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={shareRoadmap}
            className="text-white hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-2"
          >
            <Share2 size={24} />
          </button>
          <button
            onClick={handleClose}
            className="text-white hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full p-2"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-full overflow-y-auto pt-4 pb-16 px-8" onClick={(e) => e.stopPropagation()}>
        <PwigmapSection />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md p-4 flex justify-center items-center z-20">
        <span className="text-white text-sm font-['Freckle_Face']">
          © 2024 PWIG. All rights reserved. | Join us in making history, one oink at a time! 🐷🚀
        </span>
      </div>

      {/* Grain effect and decorative elements (unchanged) */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iMyIgc2VlZD0iMiIgcmVzdWx0PSJub2lzZSI+PC9mZVR1cmJ1bGVuY2U+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIj48L2ZlQ29sb3JNYXRyaXg+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMTUiPjwvcmVjdD4KPC9zdmc>')] pointer-events-none"></div>
      <div className="absolute top-20 left-4 w-24 h-24 bg-pink-500 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-20 right-4 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-2xl"></div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}