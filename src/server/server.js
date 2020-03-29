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
const server = express();

// Middleware which sets various headers to better secure the server
server.use(helmet());

// Enables reverse proxy support from loopback
server.enable('trust proxy', 'loopback');

// Middleware to parse and validate request body
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// Middleware to parse request cookies
server.use(cookieParser());
// Middleware to parse user-agent header
server.use(useragent.express());

// Set the view engine to Embedded JavaScript
server.set('view engine', 'ejs');
// Set the views directory to ./src/server/views
server.set('views', path.join(__dirname, '../src/server/views'));

/**
 * Used to parse JSON within rendering of views.
 * It's a superset of JSON that includes regex, dates and functions.
 * Also provides escaping of HTML characters to mitigate risk of XSS
 */
server.locals.serialize = serialize;

// Server static files from the location specified by razzle variable
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// Use the API routes for any requests starting within /api/v1
server.use('/api/v1', apiRoutes);

// Route direct page requests to the ssrHandler
server.get(
  routes.map(route => route.path),
  ssrHandler
);

// Catch all requests that have not yet been handled
server.get('*', (req, res) => {
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
server.use(errorHandler);

// Handle the server-side rendering of the application
function ssrHandler(req, res) {
  try {
    // Fetch the inital data and markup
    const vars = serverRenderer(req, res);
    // Render index.ejs using the specified vars and send the HTML to client
    res.render('index', vars);
  } catch (err) {
    // Log error to console
    console.error(err);
    // Respond with server error
    res.status(500).send('Server error');
  }
}

// Handle any un-caught errors
function errorHandler(err, req, res, next) {
  res.sendStatus(500);
  next();
}

export default server;
