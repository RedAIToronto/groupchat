// pages/_app.js
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import Tailwind CSS
import '../styles/globals.css';

// Dynamically import WalletModalProvider to avoid hydration issues
const WalletModalProviderDynamic = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider),
    { ssr: false }
);

// Dynamically import WalletMultiButton to avoid hydration issues
const WalletMultiButtonDynamic = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
    { ssr: false }
);

require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }) {
    // Use the custom RPC endpoint
    const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProviderDynamic>
                    <div className="win-xp-theme">
                        <Component {...pageProps} />
                    </div>
                </WalletModalProviderDynamic>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default MyApp;