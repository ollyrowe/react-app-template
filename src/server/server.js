import path from 'path';
import express from 'express';
import helmet from 'helmet';
import useragent from 'express-useragent';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serialize from 'serialize-javascript';
// Renderer for rendering JSX server side
import serverRenderer from '../common/renderers/serverRenderer';
// Import routes
import { routes } from '../common/routes';
// Import API routes
import apiRoutes from './api/routes';

// Initialise the express server
const app = express();

// Middleware which sets various headers to better secure the server
app.use(helmet());

// Enables reverse proxy support from loopback
app.enable('trust proxy', 'loopback');

// Middleware to parse and validate request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware to parse request cookies
app.use(cookieParser());
// Middleware to parse user-agent header
app.use(useragent.express());

// Set the view engine to Embedded JavaScript
app.set('view engine', 'ejs');
// Set the views directory to ./src/server/views
app.set('views', path.join(__dirname, '../src/server/views'));

/**
 * Used to parse JSON within rendering of views.
 * It's a superset of JSON that includes regex, dates and functions.
 * Also provides escaping of HTML characters to mitigate risk of XSS
 */
app.locals.serialize = serialize;

// Server static files from the location specified by razzle variable
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// Use the API routes for any requests starting within /api/v1
app.use('/api/v1', apiRoutes);

// Route direct page requests to the ssrHandler
app.get(
  routes.map(route => route.path),
  ssrHandler
);

// Catch all requests that have not yet been handled
app.get('*', (req, res) => {
  /*
   * If the request is only requesting a resource directly from root
   * e.g. /PageName, /Resource, then pass request to ssrHandler for defualt routing
   * Otherwise, if the request is trying to access a resource such as /public/resource
   * or /api/resource/id then send 404. This prevents unnecessary SSR of webapp.
   */
  if (req.path.split('/').length - 1 > 1) {
    res.sendStatus(404);
  } else {
    ssrHandler(req, res);
  }
});

// Catch all unhandled errors
app.use(errorHandler);

// Handle the server-side rendering of the application
function ssrHandler(req, res) {
  // Fetch the inital data and markup
  const vars = serverRenderer(req, res);
  // Render index.ejs using the specified vars and send the HTML to client
  res.render('index', vars);
}

// Handle any un-caught errors
function errorHandler(err, req, res, next) {
  // Check if headers haven't yet been sent
  if (!res.headersSent) {
    // Respond with server error
    res.sendStatus(500);
  }
  // Log the error to console
  console.error(err);
  next();
}

export default app;
