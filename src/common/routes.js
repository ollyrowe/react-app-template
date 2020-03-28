import React from 'react';
// Import Icons
import { Home as HomeIcon, Settings as SettingsIcon } from '@material-ui/icons';
// Import page components
import Home from '../client/pages/Home';
import Settings from '../client/pages/Settings';

export const routes = [
  {
    name: 'Home',
    path: '/Home',
    icon: <HomeIcon />,
    component: Home
  },
  {
    name: 'Settings',
    path: '/Settings',
    icon: <SettingsIcon />,
    component: Settings
  }
];

// The default route
export const defaultRoute = routes[0];
