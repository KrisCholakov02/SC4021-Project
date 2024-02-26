import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import classNames from 'classnames';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SC4021 Project',
  description: 'SC4021 Project'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          'h-screen w-screen bg-gray-100 bg-none'
        )}
      >
        {children}
      </body>
    </html>
  );
}
