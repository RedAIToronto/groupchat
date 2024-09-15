// pages/_app.js
'use client';

import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css'; // Ensure Tailwind CSS is imported

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
