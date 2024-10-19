import './globals.css'; // Your global styles
import { Inter } from '@next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'], // Customize based on the needed character sets
  weight: ['400', '500', '700'], // Customize based on font weights needed
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
