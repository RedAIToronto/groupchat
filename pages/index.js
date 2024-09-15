// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import HowToBuySection from '../components/HowToBuySection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-sky-200 dark:from-pink-900 dark:to-sky-900">
      <Head>
        <title>$PWIG - The Meme Coin Revolution</title>
        <meta name="description" content="Join the $PWIG revolution - the most exciting meme coin in the crypto farmyard!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HowToBuySection />
      </main>
      <Footer />
    </div>
  );
}
