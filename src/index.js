import express from 'express';
import http from 'http';
import cookie from 'cookie';
// Import socket.io server
import createSocketServer from './server/socketServer.js';

/**
 * Server Entry Point.
 */

// Initialise the express app
const app = express();

// Initialise the socket.io server
let io = createSocketServer(http.createServer(app));

// Use the user middleware for socket.io endpoint
io.use((socket, next) => {
  // Attempt to parse the cookies
  try {
    socket.request.cookies = cookie.parse(socket.request.headers.cookie);
  } catch (err) {
    socket.request.cookies = {};
  } finally {
    next();
  }
});

// Import the server instance
let server = require('./server/server').default;

// Import the server configurations
let config = require('./server/config');

// Use the imported server to handle requests
app.use((req, res) => server.handle(req, res));

// Listen on the configured port and host
app.listen(config.port, config.host, () => {
  console.info(`\nServer running on ${config.host}:${config.port}...`);
});

// Enable server side Hot Module Replacement (HMR)
if (module.hot) {
  // Accept server changes in server.js, socketServer.js and config.js
  module.hot.accept(
    ['./server/server', './server/socketServer', './server/config'],
    () => {
      console.log('\n🔁  HMR Reloading Server-side...');
      try {
        server = require('./server/server').default;
        io = require('./server/socketServer').default(http.createServer(app));
        config = require('./server/config');
      } catch (error) {
        console.error(error);
      }
    }
  );
  console.info('\n✅  Server-side HMR Enabled!');
}
