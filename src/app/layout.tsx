import React from 'react';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/layout/client-layout';
// import Header from '@/components/core/header';
// import Footer from '@/components/core/footer';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bench Finder',
  description: 'Find benches in your area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout>
            {/* <Header /> */}
            <main>{children}</main>
            {/* <Footer /> */}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}