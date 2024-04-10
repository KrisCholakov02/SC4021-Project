import React from 'react';

import Link from 'next/link';

import MT from '@/utils/MT';

export function QueryResultCard(result: any) {
  return (
    <MT.Card placeholder={undefined} className="!w-full bg-gray-300">
      <MT.CardBody placeholder={undefined}>
        <MT.Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {result.title}
        </MT.Typography>
        <MT.Typography placeholder={undefined}>
          {result.description}
        </MT.Typography>
      </MT.CardBody>
      <MT.CardFooter className="pt-0" placeholder={undefined}>
        <Link href={`/r/${result.id}`}>
          <MT.Button placeholder={undefined}>Read More</MT.Button>
        </Link>
      </MT.CardFooter>
    </MT.Card>
  );
}
