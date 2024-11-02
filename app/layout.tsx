import './globals.css'; // Your global styles
import { Inter } from '@next/font/google';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'], // Customize based on the needed character sets
  weight: ['400', '500', '700'], // Customize based on font weights needed
});

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ 
  children 
}: RootLayoutProps) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster/>
      </body>
    </html>
    </SessionProvider>
  );
}
