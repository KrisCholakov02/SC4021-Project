import React from 'react';

import Link from 'next/link';

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import parse from 'html-react-parser';

import MT from '@/utils/MT';

export function QueryResultCard(result: any) {
  function getSentimentColor(sentiment: string[]) {
    let s = sentiment[0];
    if (s === 'Negative') {
      return 'bg-red-500';
    } else if (s === 'Positive') {
      return 'bg-green-500';
    } else {
      return 'bg-yellow-500';
    }
  }
  let color = getSentimentColor(result.Predicted_Class);

  return (
    <MT.Card placeholder={undefined} className="!w-full bg-gray-300">
      <MT.CardBody placeholder={undefined}>
        {/* The name of the subreddit */}
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <MT.Avatar
              size="sm"
              placeholder={undefined}
              src={`../../${result.subreddit}.png`}
            ></MT.Avatar>
            <MT.Typography
              variant="h5"
              color="blue-gray"
              className="ml-2"
              placeholder={undefined}
            >
              r/{result.subreddit}
            </MT.Typography>
          </div>
          <div className="flex mb-2">
            <div
              className={
                'flex w-fit h-fit p-2 mr-2 rounded-lg items-center ' + color
              }
            >
              <MT.Typography
                color={color === 'bg-yellow-500' ? 'black' : 'white'}
                variant="paragraph"
                placeholder={undefined}
              >
                Sentimet : <strong>{result.Predicted_Class}</strong>
              </MT.Typography>
            </div>
            <div className="flex w-fit h-fit bg-white p-2 rounded-lg items-center">
              <MT.Typography variant="paragraph" placeholder={undefined}>
                Upvotes: <strong>{result.upvotes}</strong>
              </MT.Typography>
              <ArrowUpIcon className="ml-2 w-6 h-6" />
            </div>
          </div>
        </div>
        <MT.Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {result.author} • {result.created_utc[0].substring(0, 10)}
        </MT.Typography>
        {/* The body of the comment */}
        {parse(`${result.body_html}`)}
      </MT.CardBody>
      <MT.CardFooter className="pt-0" placeholder={undefined}>
        <Link href={`/r/${result.id}`}>
          <MT.Button placeholder={undefined}>Read More</MT.Button>
        </Link>
      </MT.CardFooter>
    </MT.Card>
  );
}
