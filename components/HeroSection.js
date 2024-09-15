// components/HeroSection.js
'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AnimatedTicker from './AnimatedTicker';
import bgImage from '@/public/bg.png';

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
          src={bgImage}
          alt="PWIG Banner"
          layout="fill"
          objectFit="cover"
          priority
        />
        {/* Removed black overlay */}
        {/* Added grain effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iMyIgc2VlZD0iMiIgcmVzdWx0PSJub2lzZSI+PC9mZVR1cmJ1bGVuY2U+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIj48L2ZlQ29sb3JNYXRyaXg+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMTUiPjwvcmVjdD4KPC9zdmc+')] pointer-events-none"></div>
      </motion.div>
      
      <div className="flex-grow flex flex-col items-center justify-center z-10">
        {/* Commented out hero text */}
      </div>
      
      <div className="w-full mt-auto">
        <AnimatedTicker />
      </div>
      
      {/* Commented out floating PWIG logos */}
    </section>
  );
}
