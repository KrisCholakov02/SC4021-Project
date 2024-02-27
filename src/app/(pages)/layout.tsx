'use client';
import React from 'react';

import { SimpleFooter } from '@/components/footer';
import { NavbarWithMegaMenu } from '@/components/navbar';

export default function PagesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="w-full">
        <NavbarWithMegaMenu />
      </div>
      <div className="w-full flex flex-grow bg-gray-300 py-16 px-8">
        {children}
      </div>
      <div className="w-full">
        <SimpleFooter />
      </div>
    </div>
  );
}
