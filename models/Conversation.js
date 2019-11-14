const mongoose = require('mongoose');
const Schema = require('../schema');
const ConversationModelSchema = new Schema({
  userA: String,
  userB: String,
  conversations: [{owner: String, text: String, status: String}]
});

const Conversations = mongoose.model('Conversations', ConversationModelSchema );

module.exports = Conversations;