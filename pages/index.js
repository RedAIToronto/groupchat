import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import HowToBuySection from '../components/HowToBuySection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-sky-200 dark:from-pink-900 dark:to-sky-900">
      <Head>
        <title>PWIG - Pump It With Gains</title>
        <meta name="description" content="PWIG - The memecoin that's oinking its way to the moon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HeroSection />
        <AboutSection />
        <HowToBuySection />
      </main>
    </div>
  );
}
