import React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import MT from '@/utils/MT';

export function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="inline-flex items-center justify-center w-full">
        <div className="w-9/12 p-2 bg-white rounded-md">
          <MT.Input
            size="lg"
            color="black"
            crossOrigin={undefined}
            label="Search for anything you want..."
            icon={React.createElement(MagnifyingGlassIcon, {
              strokeWidth: 2,
              className: 'text-gray-900'
            })}
          />
          <div className="">{/* Advanced search options */}</div>
        </div>
        <MT.Button size="md" className="ml-4" placeholder={undefined}>
          Advanced Search
        </MT.Button>
      </div>
    </div>
  );
}
