const mongoose = require('mongoose');
const dbUrl = "mongodb://roshan:roshandb@3.19.28.243:27017/main_db";

mongoose.connect(dbUrl);

// Connected handler
mongoose.connection.on('connected', function (err) {
  console.log("Connected to DB using chain: " + dbUrl);
});

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
   self.connectToDatabase();
});

const Schema = mongoose.Schema;
const UserModelSchema = new Schema({
  name: String,
  role: String,
});

const ConversationModelSchema = new Schema({
  userA: String,
  userB: String,
  conversations: [{owner: String, text: String, status: String}]
});

const UserModel = mongoose.model('Users', UserModelSchema );
const Conversations = mongoose.model('Conversations', ConversationModelSchema );

module.exports = {
  UserModel,
  Conversations
}