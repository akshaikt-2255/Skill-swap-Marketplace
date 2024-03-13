const { saveMessageToDB } = require('./controllers/messageController');

const socketServer = (io) => {
  console.log("Initializing connecting")
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle joining a room
    socket.on('join', ({ senderId, receiverId }) => {
      const conversationId = `${senderId}-${receiverId}`;
      socket.join(conversationId);
      console.log(`User joined room: ${conversationId}`);
    });

    // Handle sending messages
    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
      try {
        const savedMessage = await saveMessageToDB({
          senderId,
          receiverId,
          content: message.text,
        });

        console.log('Message saved to the database:', savedMessage);

        // Emit the received message to the conversation room
        io.to(`${senderId}-${receiverId}`).emit('receiveMessage', {
          conversationId: `${senderId}-${receiverId}`,
          message: savedMessage,
        });

        io.to(`${receiverId}-${senderId}`).emit('receiveMessage', {
          conversationId: `${receiverId}-${senderId}`,
          message: savedMessage,
        });

        console.log('Message emitted to conversation rooms');

      } catch (error) {
        console.error('Error handling sendMessage event:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = socketServer;
