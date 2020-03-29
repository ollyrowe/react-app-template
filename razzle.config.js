const path = require('path');

/**
 * Custom Razzle plugin for custom entry points.
 *
 * Razzle currently hardcodes the following entry points:
 *      server: ./src/server.js
 *      client: ./src/client.js
 *
 * This plugin allows for you to specify these entry points through environment variables.
 *
 * Example usage:
 *      cross-env RAZZLE_CLIENT_ENTRY_POINT=path/to/client.js RAZZLE_SERVER_ENTRY_POINT=path/to/server.js razzle start
 */

const clientEntryPoint = process.env.RAZZLE_CLIENT_ENTRY_POINT;
const serverEntryPoint = process.env.RAZZLE_SERVER_ENTRY_POINT;

const razzleCustomEntryPoint = (config, env) => {
  const { target } = env;

  // Client Web Server
  if (target === 'web' && clientEntryPoint) {
    config.entry.client[1] = path.join(__dirname, clientEntryPoint);
  }

  // Node Server
  if (target === 'node' && serverEntryPoint) {
    config.entry[2] = path.join(__dirname, serverEntryPoint);
  }

  return config;
};

module.exports = {
  plugins: [razzleCustomEntryPoint]
};
