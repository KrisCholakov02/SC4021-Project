import React from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import MT from '@/utils/MT';

export function SearchBar() {
  const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] =
    React.useState(false);

  return (
    <div className="inline-flex items-center justify-center w-full">
      {/* Container for the search input and the possible advance search options */}
      <div className="flex flex-col flex-grow min-w-fit p-2 bg-white rounded-md">
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
        {/* Container for the advanced search options */}
        <div
          className={
            'flex flex-grow mt-4 border-t-gray-300 border-t-2 ' +
            (isAdvancedSearchEnabled ? 'visible' : 'hidden')
          }
        >
          <div className="w-2/3 p-2 space-y-2">
            <MT.Typography color="black" placeholder={undefined}>
              Search Filters
            </MT.Typography>
            <div className="flex flex-grow">
              <div>
                <MT.Select label="Any Field" placeholder={undefined}>
                  <MT.Option value="title">Title</MT.Option>
                  <MT.Option value="author">Author</MT.Option>
                  <MT.Option value="content">Content</MT.Option>
                </MT.Select>
              </div>
              <div>
                <MT.Select label="Contains" placeholder={undefined}>
                  <MT.Option value="constains">Contains</MT.Option>
                  <MT.Option value="exact">Contains exact phrase</MT.Option>
                  <MT.Option value="starts">Starts with</MT.Option>
                </MT.Select>
              </div>
              <div>
                <MT.Input
                  crossOrigin={undefined}
                  label="Value"
                  color="black"
                ></MT.Input>
              </div>
            </div>
          </div>
          <div className="w-1/3 p-2 space-y-2">
            <MT.Typography color="black" placeholder={undefined}>
              Date
            </MT.Typography>
            <MT.Input
              label="From"
              color="black"
              crossOrigin={undefined}
              type="date"
            ></MT.Input>
            <MT.Input
              label="To"
              color="black"
              crossOrigin={undefined}
              type="date"
            ></MT.Input>
          </div>
        </div>
      </div>
      {/* Container for the button that enables the advance search */}
      <div className="max-w-fit">
        <MT.Button
          onClick={() => setIsAdvancedSearchEnabled(!isAdvancedSearchEnabled)}
          size="md"
          className="ml-4"
          placeholder={undefined}
        >
          {isAdvancedSearchEnabled ? 'Simple Search' : 'Advanced Search'}
        </MT.Button>
      </div>
    </div>
  );
}
