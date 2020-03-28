import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// Import routes
import { routes } from '../common/routes';
// Import Material UI Components
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleICon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
// Import Material UI CSS
import { makeStyles } from '@material-ui/core/styles';
// Import utilities
import { createNewLink } from './utils';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '100%',
    backgroundColor: theme.palette.background.main,
    display: 'flex',
    flexFlow: 'column',
    position: 'fixed',
    padding: 0
  },
  contentContainer: {
    display: 'flex',
    height: '100%',
    position: 'relative',
    overflow: 'scroll',
    padding: theme.spacing(2)
  },
  title: {
    color: theme.palette.secondary.main,
    paddingLeft: theme.spacing(2),
    flexGrow: 1
  },
  appBar: {
    position: 'relative',
    zIndex: 1200 // Above swipeable drawer
  },
  toolbar: {
    maxWidth: '680px',
    margin: 'auto'
  },
  drawerNavigiation: {
    width: '240px'
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(0.5)
  },
  routesList: {
    padding: 0
  },
  routeLink: {
    color: theme.palette.text.main
  }
}));

export function App({ initialData }) {
  // Destructure initialData for its properties
  const { appName, userAgent } = initialData;

  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Container className={classes.mainContainer}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleOpenDrawer}
            color="secondary"
            aria-label="open menu"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h1" noWrap>
            {appName}
          </Typography>
          <IconButton color="secondary">
            <AccountCircleICon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={openDrawer}
        onOpen={handleOpenDrawer}
        onClose={handleCloseDrawer}
        classes={{
          paper: classes.drawerNavigiation
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleCloseDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List classes={{ padding: classes.routesList }}>
          {routes.map((route, index) => {
            return (
              <Container key={index} disableGutters>
                <ListItem
                  key={index}
                  className={classes.routeLink}
                  component={createNewLink(route.path)}
                  to={route.path}
                  onClick={handleCloseDrawer}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText>{route.name}</ListItemText>
                </ListItem>
              </Container>
            );
          })}
        </List>
      </SwipeableDrawer>
      <Container component="main" className={classes.contentContainer}>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </Container>
    </Container>
  );
}
