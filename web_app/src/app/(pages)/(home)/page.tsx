'use client';

import React, { useEffect, useState } from 'react';

import {
  AdjustmentsHorizontalIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Select } from '@material-tailwind/react';
import classNames from 'classnames';

import { SentimentPlot } from '@/components/plot';
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
  const [sortDirection, setSortDirection] = useState('null');
  const [sortField, setSortField] = useState('null');

  // Define the distribution of the sentiment classes
  const [sentimentDistribution, setSentimentDistribution] = useState<any[]>([]);
  // Define the distribution of the subreddits
  const [subredditDistribution, setSubredditDistribution] = useState<any[]>([]);

  // Define the filtering options
  const [isFilteringOpened, setIsFilteringOpened] = useState(false);
  const [subredditFilter, setSubredditFilter] = useState<string[]>([]);
  const [upvotesFromFilter, setUpvotesFromFilter] = useState<any>(undefined);
  const [upvotesToFilter, setUpvotesToFilter] = useState<any>(undefined);
  const [publishDateFromFilter, setPublishDateFromFilter] =
    useState<any>(undefined);
  const [publishDateToFilter, setPublishDateToFilter] =
    useState<any>(undefined);
  const [authorFilter, setAuthorFilter] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('');

  // Define the page number
  const [pageNumber, setPageNumber] = useState(-1);

  async function sendSearchRequest(
    pageNumber: number,
    sortDirection: string,
    sortField: string
  ) {
    // Define the filters object
    let dates = [
      publishDateFromFilter ? publishDateFromFilter : '',
      publishDateToFilter ? publishDateToFilter : ''
    ];
    const filters = {
      subreddit: subredditFilter,
      upvotes: [upvotesFromFilter, upvotesToFilter],
      publishDate: dates,
      sentiment: sentimentFilter,
      author: authorFilter
    };
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: simpleSearchQuery !== '' ? simpleSearchQuery : '*',
          page: pageNumber,
          sortField: sortField,
          sortDirection: sortDirection,
          filters: filters
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
      setSentimentDistribution(data.facet_counts.facet_fields.Predicted_Class);
      setSubredditDistribution(data.facet_counts.facet_fields.subreddit);
      if (data.spellcheck?.suggestions.length > 0)
        setSpellSuggestions(data.spellcheck.suggestions[1].suggestion);
      else setSpellSuggestions([]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (pageNumber === -1 || sortDirection === 'null' || sortField === 'null')
      return;
    console.log(pageNumber, sortDirection, sortField);
    async function fetchData() {
      await sendSearchRequest(pageNumber, sortDirection, sortField);
    }
    fetchData();
  }, [pageNumber, sortDirection, sortField]);

  async function handleSearchClick() {
    setSearched(true);
    setPageNumber(1);
    setSortDirection('asc');
    setSortField('');
    await sendSearchRequest(1, 'asc', '');
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
    window.scrollTo(0, 0);
  }

  // Define the function to handle the subreddit checkbox change
  function handleSubredditCheckboxChange(e: any, subreddit: string) {
    let filter: string[] = [];
    if (e.target.checked) {
      filter = [...subredditFilter, subreddit];
      e.target.value = 'on';
    } else {
      filter = subredditFilter.filter((s) => s !== subreddit);
      e.target.value = 'off';
    }
    console.log(filter);
    setSubredditFilter(filter);
  }

  return (
    <div className="w-full flex flex-grow">
      {/* Container for the possible left side content to be displayed */}
      <div className="w-0 lg:w-1/4 2xl:w-1/5">
        {/*  Plot the distribution of subreddits*/}
        {subredditDistribution.length > 0 ? (
          <SentimentPlot
            data={subredditDistribution}
            title="Subreddits Distribution"
            color="one_color"
          />
        ) : null}
      </div>
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
                  <div>
                    {subreddits.map((subreddit) => (
                      <label className="flex items-center" key={subreddit}>
                        <MT.Checkbox
                          crossOrigin={undefined}
                          onChange={(e) =>
                            handleSubredditCheckboxChange(e, subreddit)
                          }
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
                {/* Sentiment Analysis Class Filtering */}
                <MT.Typography
                  variant="lead"
                  placeholder={undefined}
                  className="mb-2"
                  color="black"
                >
                  Sentiment-Based Filtering:
                </MT.Typography>
                <div className="w-fit">
                  <Select
                    label="Sentiment Class"
                    value={sentimentFilter}
                    placeholder={undefined}
                    onChange={(v) => setSentimentFilter(v as string)}
                  >
                    <MT.Option value="positive">Positive</MT.Option>
                    <MT.Option value="neutral">Neutral</MT.Option>
                    <MT.Option value="negative">Negative</MT.Option>
                  </Select>
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
                      value={upvotesFromFilter ? upvotesFromFilter : ''}
                      type="number"
                      label="From"
                      color="black"
                      onChange={(e) =>
                        setUpvotesFromFilter(Number(e.target.value))
                      }
                    />
                    <MT.Input
                      crossOrigin={undefined}
                      value={upvotesToFilter ? upvotesToFilter : ''}
                      type="number"
                      label="To"
                      color="black"
                      onChange={(e) =>
                        setUpvotesToFilter(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                {/* Publish Date Range Filtering */}
                <div className="mt-4 flex flex-col space-y-2 max-w-full">
                  <MT.Typography
                    variant="lead"
                    placeholder={undefined}
                    color="black"
                  >
                    Publish Date Range:
                  </MT.Typography>
                  <div className="flex flex-col 2xl:flex-row 2xl:space-x-2">
                    <div className="flex flex-grow ">
                      <MT.Input
                        crossOrigin={undefined}
                        type={
                          publishDateFromFilter !== undefined ? 'date' : 'text'
                        }
                        onClick={() => {
                          const today = new Date();
                          const formattedDate = today.toLocaleDateString(
                            'en-CA',
                            {
                              // Canadian locale uses yyyy-mm-dd format
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }
                          );
                          setPublishDateFromFilter(formattedDate);
                        }}
                        value={
                          publishDateFromFilter ? publishDateFromFilter : ''
                        }
                        onChange={(e) =>
                          setPublishDateFromFilter(e.target.value)
                        }
                        label="From"
                      />
                    </div>
                    <MT.Button
                      onClick={() => setPublishDateFromFilter(undefined)}
                      placeholder={undefined}
                      className="w-fit px-4 2xl:px-2"
                    >
                      <XMarkIcon className="w-4 h-4 p-0 m-0" />
                    </MT.Button>
                    <div className="flex flex-grow">
                      <MT.Input
                        crossOrigin={undefined}
                        type={
                          publishDateToFilter !== undefined ? 'date' : 'text'
                        }
                        onClick={() => {
                          const today = new Date();
                          const formattedDate = today.toLocaleDateString(
                            'en-CA',
                            {
                              // Canadian locale uses yyyy-mm-dd format
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            }
                          );
                          setPublishDateToFilter(formattedDate);
                        }}
                        value={publishDateToFilter ? publishDateToFilter : ''}
                        label="To"
                        onChange={(e) => setPublishDateToFilter(e.target.value)}
                      />
                    </div>
                    <MT.Button
                      onClick={() => setPublishDateToFilter(undefined)}
                      placeholder={undefined}
                      className="w-fit px-4 2xl:px-2"
                    >
                      <XMarkIcon className="w-4 h-4 p-0 m-0" />
                    </MT.Button>
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
                      type="text"
                      value={authorFilter}
                      onChange={(e) => setAuthorFilter(e.target.value)}
                      color="black"
                      label="Author"
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
      <div className="w-0 lg:w-1/4 2xl:w-1/5">
        {/* Plot the distribution of the sentiment classes */}
        {sentimentDistribution.length > 0 ? (
          <SentimentPlot
            data={sentimentDistribution}
            title="Sentiment Analysis Distribution"
            color="multi"
          />
        ) : null}
        {sentimentDistribution.length > 0 ? (
          <div className="mt-4 bg-white rounded-lg p-4 transition-all hover:shadow-lg">
            <MT.Typography
              variant="lead"
              color="blue-gray"
              placeholder={undefined}
            >
              Number of results: <strong>{numResults}</strong>
            </MT.Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
