const mongoose = require('mongoose');
// const dbUrl = "mongodb://roshan:roshandb@3.19.28.243:27017/main_db";
const dbUrl = "mongodb://127.0.0.1:27017/main_db";

mongoose.connect(dbUrl);

// app.use(session({
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));
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
  console.log('disconnected to db');
  //  self.connectToDatabase();
});

module.exports = mongoose.Schema;