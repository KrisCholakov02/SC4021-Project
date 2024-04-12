'use client';

import React, { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { QueryResultCard } from '@/components/query-result-card';
import MT from '@/utils/MT';

export default function Home() {
  // Define the results from the search
  const [results, setResults] = useState<{}[]>([]);

  async function sendSimpleSearchRequest() {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: simpleSearchQuery ? simpleSearchQuery : '*',
          field: 'body'
        })
      });
      if (response.status !== 200) {
        console.error('An error occurred:', response.statusText);
        return;
      }
      const data = await response.json();
      setResults(data.response.docs);
      if (data.spellcheck?.suggestions.length > 0)
        setSpellSuggestions(data.spellcheck.suggestions[1].suggestion);
      else setSpellSuggestions([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function sendAdvancedSearchRequest() {
    try {
      const response = await fetch('/api/search');
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Define the variable to store if the user has searched for something
  const [searched, setSearched] = useState(false);

  const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] =
    React.useState(false);

  async function handleSearchClick() {
    setSearched(true);
    if (!isAdvancedSearchEnabled) {
      await sendSimpleSearchRequest();
    } else {
      await sendAdvancedSearchRequest();
    }
  }

  // Define the simple search query
  const [simpleSearchQuery, setSimpleSearchQuery] = useState('');

  // Define the spell suggestions
  const [spellSuggestions, setSpellSuggestions] = useState<string[]>([]);

  return (
    <div className="w-full flex flex-grow">
      {/* Container for the possible left side content to be displayed */}
      <div className="w-0 lg:w-1/4 2xl:w-1/5"></div>
      {/* Container for central functionality - Search, Results, Sort, etc. */}
      <div className="flex-col flex flex-grow basis-0 items-center justify-center px-8 xl:px-12 2xl:px-18">
        <div className="w-full flex flex-col items-center justify-items-center">
          <div
            onClick={() => {
              // Refresh the page
              window.location.reload();
            }}
            className="mb-8 w-72 h-40"
            style={{
              backgroundImage: `url(logo-nobg.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="mb-8 w-full">
            {/* A select with all possible spell suggestions*/}
            {spellSuggestions.length > 0 ? (
              <div className="w-fit mb-2 bg-white p-2 rounded-lg">
                <MT.Select
                  label="Spell Suggestions"
                  placeholder={undefined}
                  onChange={(e: string | undefined) =>
                    setSimpleSearchQuery(e as string)
                  }
                >
                  {spellSuggestions.map((suggestion, index) => (
                    <MT.Option key={index} value={suggestion}>
                      {suggestion}
                    </MT.Option>
                  ))}
                </MT.Select>
              </div>
            ) : null}
            <div className="inline-flex items-center justify-center w-full">
              {/* Container for the search input and the possible advance search options */}
              <div className="flex flex-col flex-grow min-w-fit p-2 bg-white rounded-md">
                <MT.Input
                  size="lg"
                  color="black"
                  value={simpleSearchQuery}
                  onChange={(e) => setSimpleSearchQuery(e.target.value)}
                  crossOrigin={undefined}
                  label="Search for anything you want..."
                  icon={
                    <button
                      className="h-full w-full"
                      onClick={async () => await handleSearchClick()}
                    >
                      {React.createElement(MagnifyingGlassIcon, {
                        strokeWidth: 2,
                        className:
                          'text-gray-600 hover:text-gray-900 transition-colors'
                      })}
                    </button>
                  }
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
                          <MT.Option value="exact">
                            Contains exact phrase
                          </MT.Option>
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
                  onClick={() =>
                    setIsAdvancedSearchEnabled(!isAdvancedSearchEnabled)
                  }
                  size="md"
                  className="ml-4"
                  placeholder={undefined}
                >
                  {isAdvancedSearchEnabled
                    ? 'Simple Search'
                    : 'Advanced Search'}
                </MT.Button>
              </div>
            </div>
          </div>
        </div>
        {searched ? (
          <div className="w-full flex flex-col items-center justify-items-center space-y-8 bg-white rounded-lg p-4">
            <div className="flex w-full items-center">
              <div className="w-fit ml-4">
                <MT.Select label="Sort By" placeholder={undefined}>
                  <MT.Option value="s1">Sort 1</MT.Option>
                  <MT.Option value="s2">Sort 2</MT.Option>
                  <MT.Option value="s3">Sort 3</MT.Option>
                </MT.Select>
              </div>
            </div>
            {results.map((result, index) => (
              <div key={index} className="w-full">
                <QueryResultCard {...result} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {/* Container for the possible right side content - Charts, Graph, Stats, etc. */}
      <div className="w-0 lg:w-1/4 2xl:w-1/5"></div>
    </div>
  );
}
