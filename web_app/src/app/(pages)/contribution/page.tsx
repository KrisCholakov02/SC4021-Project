'use client';
import React from 'react';

import Link from 'next/link';

import { UserCircleIcon } from '@heroicons/react/24/outline';

import ContentCenterLayout from '@/components/center-content-layout';
import MT from '@/utils/MT';

export default function ContributionPage() {
  // List of contributors
  const contributors = [
    {
      name: 'Haja Kiyasudeen Nusrath Hajara',
      github: 'https://github.com/Nusra7479'
    },
    {
      name: 'T. Daranidarran',
      github: 'https://github.com/PeryGrey'
    },
    {
      name: 'Cholakov Kristiyan Kamenov',
      github: 'https://github.com/KrisCholakov02'
    },
    {
      name: 'Ma Chunyou',
      github: 'https://github.com/macayo12138'
    },
    {
      name: 'Rayudu Abhiteja Phani',
      github: 'https://github.com/Abhiteja22'
    },
    {
      name: 'Wu Rongxi',
      github: 'https://github.com/roroloveorea'
    }
  ];

  // Sort the contributors alphabetically
  contributors.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ContentCenterLayout>
      <MT.Typography
        placeholder={undefined}
        variant="h1"
        color="blue-gray"
        className="mb-4"
      >
        Contribution
      </MT.Typography>
      <MT.Typography variant="h4" color="blue-gray" placeholder={undefined}>
        This project was created by:
      </MT.Typography>
      <MT.List placeholder={undefined} className="w-fit">
        {contributors.map((contributor) => (
          <MT.ListItem
            placeholder={undefined}
            className="flex items-center gap-2 py-2 pr-4"
            key={contributor.name}
          >
            <UserCircleIcon className="h-6 w-6 text-blue-gray-500" />
            <Link href={contributor.github}>{contributor.name}</Link>
          </MT.ListItem>
        ))}
      </MT.List>
    </ContentCenterLayout>
  );
}
