import dynamic from 'next/dynamic';

const SolanaIRCChat = dynamic(() => import('../components/SolanaIRCChat'), { ssr: false });

export default function Home() {
    return <SolanaIRCChat />;
}