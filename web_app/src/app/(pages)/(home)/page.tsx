'use client';

import React, { useEffect, useState } from 'react';

import {
  AdjustmentsHorizontalIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import classNames from 'classnames';

// Import the rc-slider component
import { QueryResultCard } from '@/components/query-result-card';
import MT from '@/utils/MT';

export default function Home() {
  // Define the results from the search
  const [results, setResults] = useState<{}[]>([]);
  // Define the speed of the search
  const [searchSpeed, setSearchSpeed] = useState(undefined);
  // Define the number of results from the search
  const [numResults, setNumResults] = useState(0);

  // Define the variable to store if the user has searched for something
  const [searched, setSearched] = useState(false);

  // Define the simple search query
  const [simpleSearchQuery, setSimpleSearchQuery] = useState('');

  // Define the spell suggestions
  const [spellSuggestions, setSpellSuggestions] = useState<string[]>([]);

  // Define the sorting options
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortField, setSortField] = useState('');

  // Define the filtering options
  const [isFilteringOpened, setIsFilteringOpened] = useState(false);
  const [isFilteringApplied, setIsFilteringApplied] = useState(false);

  // Define the page number
  const [pageNumber, setPageNumber] = useState(1);

  async function sendSimpleSearchRequest(
    pageNumber: number = 1,
    sortDirection: string = 'asc',
    sortField: string = ''
  ) {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: simpleSearchQuery ? simpleSearchQuery : '*',
          field: 'body',
          numRows: 10,
          page: pageNumber,
          sortField: sortField,
          sortDirection: sortDirection
        })
      });
      if (response.status !== 200) {
        console.error('An error occurred:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
      setSearchSpeed(data.responseHeader.QTime);
      setResults(data.response.docs);
      setNumResults(data.response.numFound);
      if (data.spellcheck?.suggestions.length > 0)
        setSpellSuggestions(data.spellcheck.suggestions[1].suggestion);
      else setSpellSuggestions([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await sendSimpleSearchRequest(pageNumber, sortDirection, sortField);
    }
    fetchData();
  }, [pageNumber, sortDirection, sortField]);

  async function sendSearchWithFiltersRequest() {
    try {
      const response = await fetch('/api/search');
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleSearchClick() {
    setSearched(true);
    setPageNumber(1);
    if (!isFilteringApplied) {
      await sendSimpleSearchRequest();
    } else {
      await sendSearchWithFiltersRequest();
    }
  }

  async function handleSortDirectionChange() {
    if (sortDirection === 'asc') setSortDirection('desc');
    else setSortDirection('asc');
  }

  // Define the list with the subreddits
  const subreddits = [
    'virtualreality',
    'augmentedreality',
    'VisionPro',
    'MetaQuestVR',
    'oculus',
    'OculusQuest'
  ];

  // Define the function to handle the page number change
  async function handlePageNumberChange(change: number) {
    if (pageNumber + change < 1) return;
    else if (pageNumber + change > numResults / 10) return;
    setPageNumber(pageNumber + change);
  }

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
          <div className="mb-4 w-full">
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
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <MT.Button
            size="sm"
            className="flex h-fit items-center justify-end"
            onClick={() => setIsFilteringOpened(!isFilteringOpened)}
            placeholder={undefined}
          >
            Filters
            <AdjustmentsHorizontalIcon className="w-6 h-6 ml-2" />
          </MT.Button>
          {isFilteringOpened ? (
            <div className="w-full p-4 mt-4 flex flex-col md:flex-row md:justify-between bg-white rounded-lg">
              <div className="w-1/3">
                {/* Subreddit Filtering */}
                <div>
                  <MT.Typography
                    variant="lead"
                    placeholder={undefined}
                    color="black"
                  >
                    Filter by Subreddit:
                  </MT.Typography>
                  <div className="">
                    {subreddits.map((subreddit) => (
                      <label className="flex items-center" key={subreddit}>
                        <MT.Checkbox
                          crossOrigin={undefined}
                          color="blue-gray"
                          id={subreddit}
                        />
                        <MT.Typography
                          placeholder={undefined}
                          color="blue-gray"
                          className="ml-2"
                        >
                          r/{subreddit}
                        </MT.Typography>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-2/3">
                {/* Upvotes Range Filtering */}
                <div className="flex flex-col space-y-2">
                  <MT.Typography
                    variant="lead"
                    placeholder={undefined}
                    color="black"
                  >
                    Upvotes Range:
                  </MT.Typography>
                  <div className="flex items-center space-x-4">
                    <MT.Input
                      crossOrigin={undefined}
                      type="number"
                      label="From"
                      color="black"
                    />
                    <MT.Input
                      crossOrigin={undefined}
                      type="number"
                      label="To"
                      color="black"
                    />
                  </div>
                </div>
                {/* Publish Date Range Filtering */}
                <div className="mt-4 flex flex-col space-y-2">
                  <MT.Typography
                    variant="lead"
                    placeholder={undefined}
                    color="black"
                  >
                    Publish Date Range:
                  </MT.Typography>
                  <div className="flex items-center space-x-4">
                    <MT.Input
                      crossOrigin={undefined}
                      type="date"
                      label="From"
                    />
                    <MT.Input crossOrigin={undefined} type="date" label="To" />
                  </div>
                </div>
                {/* Field Search Filtering */}
                <div className="mt-4 flex flex-col space-y-2">
                  <MT.Typography
                    variant="lead"
                    placeholder={undefined}
                    color="black"
                  >
                    Field Search:
                  </MT.Typography>
                  <div>
                    <MT.Input
                      crossOrigin={undefined}
                      color="black"
                      label="Author"
                    />
                  </div>
                  <div>
                    <MT.Input
                      crossOrigin={undefined}
                      color="black"
                      label="Title"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {searched ? (
          <div>
            <MT.Typography
              className="mb-4"
              color="black"
              placeholder={undefined}
            >
              The search executed in {searchSpeed}ms
            </MT.Typography>
          </div>
        ) : null}
        {searched ? (
          <div className="w-full flex flex-col items-center justify-items-center space-y-8 bg-white rounded-lg p-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <div className="w-fit">
                  <MT.Select
                    label="Sort By"
                    value={sortField}
                    onChange={(v) => setSortField(v as string)}
                    placeholder={undefined}
                  >
                    <MT.Option value="">Recommend</MT.Option>
                    <MT.Option value="created_utc">Publish Date</MT.Option>
                    <MT.Option value="upvotes">Upvotes</MT.Option>
                  </MT.Select>
                </div>
                <div>
                  {sortField !== '' ? (
                    <MT.IconButton
                      color="blue-gray"
                      variant="outlined"
                      className="ml-4"
                      placeholder={undefined}
                      onClick={handleSortDirectionChange}
                    >
                      <ArrowUpIcon
                        className={classNames('w-full h-full transition-all', {
                          'rotate-180': !(sortDirection === 'asc')
                        })}
                        color="blue-gray"
                      />
                    </MT.IconButton>
                  ) : null}
                </div>
              </div>
            </div>
            <hr className="w-full my-4 border-gray-300" />
            {results.map((result, index) => (
              <div
                key={index}
                className="w-full rounded-lg hover:shadow-lg transition-all"
              >
                <QueryResultCard {...result} />
              </div>
            ))}
          </div>
        ) : null}
        {searched && results.length !== 0 ? (
          <div className="flex w-full justify-center items-center mt-4">
            <MT.Button
              placeholder={undefined}
              onClick={async () => await handlePageNumberChange(-1)}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </MT.Button>
            <MT.Typography
              className="mx-4"
              variant="h3"
              color="black"
              placeholder={undefined}
            >
              Page {pageNumber}
            </MT.Typography>
            <MT.Button
              placeholder={undefined}
              onClick={async () => await handlePageNumberChange(1)}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </MT.Button>
          </div>
        ) : null}
      </div>
      {/* Container for the possible right side content - Charts, Graph, Stats, etc. */}
      <div className="w-0 lg:w-1/4 2xl:w-1/5"></div>
    </div>
  );
}
