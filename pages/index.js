import { useEffect } from 'react';
import SolanaIRCChat from '../components/SolanaIRCChat';

export default function Home() {
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  return (
      <div>
        <SolanaIRCChat />
      </div>
  );
}