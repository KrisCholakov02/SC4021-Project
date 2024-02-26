'use client';

import React from 'react';

import { SearchBar } from '@/components/search-bar';

export default function Home() {
  return (
    <div className="flex-col flex-grow flex items-center">
      <div className="mb-8 bg-black w-56 h-32">Logo</div>
      <div className="mb-4 w-full">
        <SearchBar />
      </div>
      <div className="flex flex-grow bg-red-400">dd</div>
    </div>
  );
}
