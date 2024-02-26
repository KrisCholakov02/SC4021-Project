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
    <div className="flex flex-col min-h-screen">
      <NavbarWithMegaMenu />
      <div className="flex flex-grow bg-red-400">{children}</div>
      <SimpleFooter />
    </div>
  );
}
