import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import BuildingStorefrontIcon from "@heroicons/react/24/solid/BuildingStorefrontIcon";
import ArrowLeftOnRectangleIcon from '@heroicons/react/24/solid/ArrowLeftOnRectangleIcon';
import CogIcon from "@heroicons/react/24/solid/CogIcon"
import { SvgIcon } from '@mui/material';

import { routes } from 'src/constants/routes';

export const items = [
  {
    title: 'Overview',
    path: routes.overview,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Listing',
    path: routes.listing,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'My Account',
    path: '#',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Seller Dashboard Store',
    path: '#',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingStorefrontIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '#',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Logout',
    path: '#',
    icon: (
      <SvgIcon fontSize="small">
        <ArrowLeftOnRectangleIcon />
      </SvgIcon>
    )
  }
];
