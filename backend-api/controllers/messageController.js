const Message = require('../models/Message');
const Conversation = require('../models/Conversations');
const User = require('../models/User');
const { getUserByUsername } = require('./userController');

const getConversationByParticipants = async (participant1, participant2) => {
  try {
    // Find the conversation by participants
    console.log({participant1})
    console.log({participant2})
    const conversation = await Conversation.findOne({
      participants: { $all: [participant1, participant2] },
    });
    console.log({conversation})
    return conversation;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

const getMessagesByIds = async (messageIds) => {
  try {
    // Find the messages by their IDs
    const messages = await Message.find({ _id: { $in: messageIds } });
    return messages;
  } catch (error) {
    console.error('Error fetching messages by IDs:', error);
    throw error;
  }
};


const saveMessageToDB = async ({ senderId, receiverId, content }) => {
  try {
    const sender = await getUserByUsername(senderId);
    const receiver = await getUserByUsername(receiverId);

    // Get existing or create a new conversation
    let conversation = await getConversationByParticipants(sender, receiver);

    if (!conversation) {
      conversation = new Conversation({
        participants: [sender, receiver],
      });
    }

    // Create a new message
    const message = new Message({
      sender: sender,
      content: content,
      conversation: conversation,
    });

    await message.save();

    // Save the message to the conversation
    conversation.messages.push(message);

    // Save the conversation
    await conversation.save();

    // Save the conversation reference to both users' chat history
    await User.updateMany(
      { _id: { $in: [sender, receiver] } },
      { $addToSet: { chatHistory: conversation._id } }
    );

    return message;
  } catch (error) {
    console.error('Error saving message to database:', error);
    throw error;
  }
};


const deleteChat = async (participant1Id, participant2Id) => {
  try {
    // Find the conversation by participants
    const conversation = await Conversation.findOne({
      participants: { $all: [participant1Id, participant2Id] },
    });

    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    // Delete all messages associated with the conversation
    await Message.deleteMany({ _id: { $in: conversation.messages } });

    // Remove the conversation reference from both users' chat history
    await User.updateMany(
      { _id: { $in: [participant1Id, participant2Id] } },
      { $pull: { chatHistory: conversation._id } }
    );

    // Delete the conversation itself
    await Conversation.deleteOne({ _id: conversation._id });

    return { message: 'Chat deleted successfully.' };
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
};

module.exports = {
  saveMessageToDB,
  getConversationByParticipants,
  getMessagesByIds,
  deleteChat
};
