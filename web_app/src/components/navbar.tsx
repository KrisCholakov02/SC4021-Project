import React from 'react';

import Link from 'next/link';

import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  Bars4Icon,
  SquaresPlusIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';
import {
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography
} from '@material-tailwind/react';

const navListMenuItems = [
  {
    title: 'Item 1',
    description: 'This is the description for item 1.',
    icon: SquaresPlusIcon
  },
  {
    title: 'Item 2',
    description: 'This is the description for item 2.',
    icon: UserGroupIcon
  },
  {
    title: 'Item 3',
    description: 'This is the description for item 3.',
    icon: Bars4Icon
  }
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem
          className="flex items-center gap-3 rounded-lg"
          placeholder={undefined}
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {' '}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 text-gray-900 w-6'
            })}
          </div>
          <div>
            <Typography
              placeholder={undefined}
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              placeholder={undefined}
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography
            as="div"
            variant="small"
            className="font-medium"
            placeholder={undefined}
          >
            <ListItem
              placeholder={undefined}
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Topics
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder={undefined}
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List
      placeholder={undefined}
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
    >
      <Typography
        placeholder={undefined}
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem
          placeholder={undefined}
          className="flex items-center gap-2 py-2 pr-4"
        >
          Home
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        placeholder={undefined}
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem
          placeholder={undefined}
          className="flex items-center gap-2 py-2 pr-4"
        >
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      placeholder={undefined}
      className="!w-full rounded-none max-w-none px-8 py-2"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link href={'/'}>
          <Typography
            placeholder={undefined}
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            SC4021 Project
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
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
        <IconButton
          placeholder={undefined}
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button
            placeholder={undefined}
            variant="outlined"
            size="sm"
            color="blue-gray"
            fullWidth
          >
            Log In
          </Button>
          <Button
            placeholder={undefined}
            variant="gradient"
            size="sm"
            fullWidth
          >
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
