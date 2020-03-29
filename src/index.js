import express from 'express';
import http from 'http';
// Import socket.io server
import socketServer from './server/socketServer.js';

/**
 * The contents of this file may seem confusing at first, however, it
 * is necessary to enable server-side Hot Module Replacement (HMR).
 *
 * Firstly, we have to create a new express instance and then create a
 * new https server using the express server as the request listener.
 * This server is then used to initialise the socketServer.
 *
 * The server handling done by express is passed to the express app within
 * server.js which is stored within a vaiable. The Socket.io instance and
 * the server configurations are also stored in variables. Upon accepting
 * a module during the HMR reloading process, the server, socket.io instance,
 * and configurations will be reassigned with the new, updated contents of
 * their ascociated files.
 *
 * Finally, the http server will then listen for incomming requests.
 */

// Initialise the express app
const app = express();

// Initialise the http server from the express app
const httpServer = http.createServer(app);

// Initialise the socket.io server from the http server
let io = socketServer(httpServer);

// Import the server instance
let server = require('./server/server').default;

// Import the server configurations
let config = require('./server/config');

// Use the imported server to handle requests
app.use((req, res) => server.handle(req, res));

// Listen on the configured port and host
httpServer.listen(config.port, config.host, () => {
  console.info(`\nServer running on ${config.host}:${config.port}...`);
});

// Enable server-side Hot Module Replacement (HMR)
if (module.hot) {
  // Accept server changes in server.js, socketServer.js and config.js
  module.hot.accept(
    ['./server/server', './server/socketServer', './server/config'],
    () => {
      console.log('\n🔁  HMR Reloading Server-side...');
      try {
        // Reassign the variables with the new file contents
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
