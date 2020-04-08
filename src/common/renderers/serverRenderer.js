import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, ServerStyleSheets } from '@material-ui/core/styles';
// Import the App component
import { App } from '../../client/App';
// Import the App Data
import appData from '../../common/appData';
// Import the routes
import { routes, defaultRoute } from '../../common/routes';
// Import the theme
import { theme } from '../../client/styles/theme';

// Fetch URLs of any assets
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

function serverRenderer(req, res) {
  // Used to collect the initial css for the inital markup
  const sheets = new ServerStyleSheets();

  // Fetch the valid route paths
  const validPaths = routes.map(route => route.path);

  // Redirect the user to the default route if that have entered an invalid path
  if (!validPaths.includes(req.path)) {
    return res.redirect(defaultRoute.path);
  }

  // The inital data
  const initialData = {
    ...appData,
    userAgent: req.userAgent
  };

  // Render the component to a string
  const initialMarkup = ReactDOMServer.renderToString(
    sheets.collect(
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <StaticRouter location={req.url}>
            <App initialData={initialData} />
          </StaticRouter>
        </ThemeProvider>
      </React.Fragment>
    )
  );

  // Fetch the initial CSS from sheets
  const initialCss = sheets.toString();

  return {
    initialData,
    initialMarkup,
    initialCss,
    assets
  };
}

export default serverRenderer;
