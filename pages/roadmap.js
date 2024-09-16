import { useEffect, useState } from 'react';
import PwigmapPopup from '../components/PwigmapPopup';
import { useRouter } from 'next/router';

// Update these constants
const CONTRACT_ADDRESS = "Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump";
const BUY_LINK = "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=Aeg8m3xBiFTwRP8jrk2cMFZ9ZUhTWtkWPcDdRyRHpump&fixed=in";

export default function RoadmapPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Check if the page is accessed directly
    if (router.asPath === '/roadmap') {
      // It's a standalone page
      setMounted(true);
    } else {
      // It's opened as a popup, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!mounted) return null;

  return <PwigmapPopup isStandalone={true} contractAddress={CONTRACT_ADDRESS} buyLink={BUY_LINK} />;
}