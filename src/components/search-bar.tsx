import React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import MT from '@/utils/MT';

export function SearchBar() {
  return (
    <div className="inline-flex items-center justify-center w-full">
      {/* Container for the search input and the possible advance search options */}
      <div className="flex flex-grow min-w-fit p-2 bg-white rounded-md">
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
      {/* Container for the button that enables the advance search */}
      <div>
        <MT.Button size="md" className="ml-4 w-fit" placeholder={undefined}>
          Advanced Search
        </MT.Button>
      </div>
    </div>
  );
}
