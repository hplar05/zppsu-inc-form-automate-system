'use client';

import Head from 'next/head';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>ZPPSU INC FORM AUTOMATE</title>
        <meta name="description" content="ZPPSU INC FORM AUTOMATE" />
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <AuthContextProvider>
          <Toaster />
          <Navbar />
          {children}
          </AuthContextProvider>
        </body>
      </html>
    </>
  );
}
