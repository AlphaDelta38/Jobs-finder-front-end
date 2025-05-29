import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import {AuthProvider} from '@/contexts/AuthProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jobs finder',
  description: 'Help you find your first job. The site for searching jobs',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} antialiased`}
      >
      <AuthProvider>
          <Header />
          <main>{children}</main>
      </AuthProvider>
      </body>
    </html>
  );
}
