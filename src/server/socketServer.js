import socket from 'socket.io';

/**
 * Socket.io is used to allow real-time communication between server and client.
 */

/**
 * Initialises socket.io server from a given http/https server instance.
 */
function socketServer(server) {
  // Initialise the socket.io server
  const io = socket(server);

  // Setup the socket.io connection endpoint
  io.on('connection', socket => {
    // Recieve requests
    // socket.on('notification', (data) => {...}
    // Emit requests
    // io.to(recipientSocketID).emit('notification', messageData);
  });

  // Return the socket.io server instance
  return io;
}

export default socketServer;
