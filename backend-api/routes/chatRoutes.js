const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/messageController');
const { getUserByUsername } = require('../controllers/userController');

chatRouter.post('/sendMessage', chatController.saveMessageToDB);

chatRouter.get('/getMessages/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;
    const sender = await getUserByUsername(senderId);
    const receiver = await getUserByUsername(receiverId);
  
    try {
      const conversation = await chatController.getConversationByParticipants(sender, receiver);
  
      if (conversation) {
        const messageIds = conversation.messages; 
        const messages = await chatController.getMessagesByIds(messageIds);// Assuming conversation.messages is an array of message IDs
        console.log({messages})
        return res.status(200).json(messages);
      } else {
        return res.status(404).json({ error: "Conversation not found." });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: "Server error while fetching messages." });
    }
});

chatRouter.delete('/deleteChat/:participant1Id/:participant2Id', async (req, res) => {
  const { participant1Id, participant2Id } = req.params;
  
  try {
    const result = await chatController.deleteChat(participant1Id, participant2Id);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting chat:', error);
    return res.status(500).json({ error: "Server error while deleting chat." });
  }
});

  
module.exports = chatRouter;
