import React from 'react';

import Link from 'next/link';

import { Button, Navbar, Typography } from '@material-tailwind/react';

export function NavbarWithMegaMenu() {
  return (
    <Navbar
      placeholder={undefined}
      className="!w-full rounded-none max-w-none px-8 py-2"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="w-1/5">
          <div
            onClick={() => {
              // Refresh the page
              window.location.reload();
            }}
            className="w-10 h-10"
            style={{
              backgroundImage: `url(logo-nobg.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        <Link href={'/'}>
          <Typography placeholder={undefined} variant="h3">
            SC4021 Project
          </Typography>
        </Link>
        <div className="w-1/5 justify-end hidden gap-2 lg:flex">
          <Button
            placeholder={undefined}
            variant="text"
            size="sm"
            color="blue-gray"
          >
            Log In
          </Button>
          <Button placeholder={undefined} variant="gradient" size="sm">
            Sign Up
          </Button>
        </div>
      </div>
    </Navbar>
  );
}
