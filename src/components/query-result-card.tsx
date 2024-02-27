import React from 'react';

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
        <MT.Button placeholder={undefined}>Read More</MT.Button>
      </MT.CardFooter>
    </MT.Card>
  );
}
