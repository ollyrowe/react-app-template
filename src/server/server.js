import path from 'path';
import express from 'express';
import userAgent from 'express-useragent';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serialize from 'serialize-javascript';
// Renderer for rendering JSX server side
import serverRenderer from '../common/renderers/serverRenderer';
// Import routes
import { routes } from '../common/routes';
// Import API routes
import apiRoutes from './api/routes';

const pageRoutes = routes.map(route => route.path);
pageRoutes.push('/');

// Initialise the express server
const server = express();

// Enables reverse proxy support
server.enable('trust proxy');
// Set the view engine to Embedded JavaScript
server.set('view engine', 'ejs');
// Disable X-Powered-By header
server.disable('x-powered-by');

// Middleware to read POST data
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// Middleware to read request cookies
server.use(cookieParser());
// Middleware to parse user-agent header
server.use(parseUserAgent);

// Set the views directory
server.set('views', path.join(__dirname, '../src/server/views'));

// Catch any errors
server.use((error, req, res, next) => {
  // If a malformed request causes a syntax error, respond with bad request
  if (error instanceof SyntaxError) {
    res.status(400).send('There was an error in the syntax of the request');
  } else {
    next();
  }
});

// Server static file from the location specified by razzle variable
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

// Serve static files from ./public/static
server.use(express.static('./public/static'));

// Superset of JSON that includes regular expressions, dates and functions
server.locals.serialize = serialize;

// Use the API routes
server.use('/api/v1', apiRoutes);

// Route direct page requests
server.get(pageRoutes, ssrHandler);

// Upon request, render and respond with index.ejs
server.get('*', async (req, res) => {
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

/**
 * Parse the user-agent header into more usable properties.
 */
function parseUserAgent(req, res, next) {
  req.userAgent = userAgent.parse(req.headers['user-agent']);
  next();
}

export default server;
