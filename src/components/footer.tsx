import React from 'react';

import { Typography } from '@material-tailwind/react';

export function SimpleFooter() {
  const links = [
    {
      title: 'About Us',
      url: '#'
    },
    {
      title: 'Topics',
      url: '#'
    },
    {
      title: 'Contribution',
      url: '#'
    }
  ];

  return (
    <footer className="flex w-full h-fit flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t bg-white py-6 text-center md:justify-between px-8">
      <Typography
        color="blue-gray"
        className="font-normal"
        placeholder={undefined}
      >
        SC4021 Project
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        {links.map((link, index) => (
          <li key={index}>
            <Typography
              as="a"
              href={link.url}
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              placeholder={undefined}
            >
              {link.title}
            </Typography>
          </li>
        ))}
      </ul>
    </footer>
  );
}
