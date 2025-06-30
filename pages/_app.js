import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // You can add any app-wide logic here
  React.useEffect(() => {
    // Optional: Add any app-wide effects
    console.log('App mounted, current path:', router.pathname);
  }, [router.pathname]);

  return (
    <main className="min-h-screen bg-slate-900">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
