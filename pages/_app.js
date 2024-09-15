// pages/_app.js
'use client';

import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

// Grain effect configuration
const GRAIN_CONFIG = {
  enabled: true, // Set to false to remove the grain effect entirely
  opacity: 0.2, // Adjust this value to control the intensity (0 to 1)
  blendMode: 'overlay', // You can experiment with different blend modes
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isRoadmapPage = router.pathname === '/roadmap';

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-sky-200 dark:from-pink-900 dark:to-sky-900 relative">
        {/* Grain effect overlay */}
        {GRAIN_CONFIG.enabled && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                opacity: GRAIN_CONFIG.opacity,
                mixBlendMode: GRAIN_CONFIG.blendMode,
              }}
            ></div>
          </div>
        )}

        {!isRoadmapPage && <Header />}
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
