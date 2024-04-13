import React from 'react';

import { ArrowUpIcon } from '@heroicons/react/24/outline';

import MT from '@/utils/MT';

export function SubmissionCard({
  subreddit,
  result
}: {
  subreddit: string;
  result: any;
}) {
  return (
    <MT.Card placeholder={undefined} className="!w-full bg-gray-300">
      <MT.CardBody placeholder={undefined}>
        {/* The name of the subreddit */}
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <MT.Avatar
              size="sm"
              placeholder={undefined}
              src={`../../${subreddit}.png`}
            ></MT.Avatar>
            <MT.Typography
              variant="h5"
              color="blue-gray"
              className="ml-2"
              placeholder={undefined}
            >
              r/{subreddit}
            </MT.Typography>
          </div>
          <div className="flex w-fit h-fit bg-white p-2 rounded-lg items-center">
            <MT.Typography variant="paragraph" placeholder={undefined}>
              Upvotes: <strong>{result.upvotes}</strong>
            </MT.Typography>
            <ArrowUpIcon className="ml-2 w-6 h-6" />
          </div>
        </div>
        <MT.Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {result.author} •{' '}
          {result.created_utc ? result.created_utc[0].substring(0, 10) : ''}
        </MT.Typography>
        <MT.Typography
          variant="lead"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {result.title}
        </MT.Typography>
        {result.selftext ? result.selftext : ''}
      </MT.CardBody>
      <MT.CardFooter className="pt-0" placeholder={undefined}>
        <a href={result.url} target="_blank" rel="noreferrer">
          <MT.Button color="deep-orange" placeholder={undefined}>
            Open in Reddit
          </MT.Button>
        </a>
      </MT.CardFooter>
    </MT.Card>
  );
}
