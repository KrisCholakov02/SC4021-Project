import React from 'react';

import { ArrowUpIcon } from '@heroicons/react/24/outline';
import parse from 'html-react-parser';

import MT from '@/utils/MT';

export function CommentCard(result: any) {
  return (
    <MT.Card placeholder={undefined} className="!w-full bg-gray-300">
      <MT.CardBody placeholder={undefined}>
        {/* The name of the subreddit */}
        <div className="flex justify-between items-center">
          <MT.Typography
            variant="lead"
            color="blue-gray"
            className="w-fit items-center"
            placeholder={undefined}
          >
            {result.author} • {result.created_utc}
          </MT.Typography>
          <div className="flex w-fit h-fit bg-white p-2 rounded-lg items-center">
            <MT.Typography variant="paragraph" placeholder={undefined}>
              Upvotes: <strong>{result.upvotes}</strong>
            </MT.Typography>
            <ArrowUpIcon className="ml-2 w-6 h-6" />
          </div>
        </div>
        {/* The body of the comment */}
        {parse(`${result.body_html}`)}
      </MT.CardBody>
    </MT.Card>
  );
}
