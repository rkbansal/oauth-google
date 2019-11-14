require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser');
const https = require('https')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')
const { SESSION_SECRET, CLIENT_ORIGIN } = require('./config')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
global.app = app;
let server

// If we are in production we are already running in https
if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app)
}
// We are not in production so load up our certificates to be able to 
// run the server in https mode locally
else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.cert'))
  }
  server = https.createServer(certOptions, app)
  // server = http.createServer(app);
}

// Setup for passport and to accept JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true,
  saveUninitialized: true,
  name: 'connect.localhost:8080'
}))
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session());
passportInit()

// Accept requests from our client
app.use(cors({
  origin: CLIENT_ORIGIN
})) 

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)

// Catch a start up request so that a sleepy Heroku instance can  
// be responsive as soon as possible
app.get('/wake-up', (req, res) => res.send('👍'))

// Direct other requests to the auth router
app.use('/auth', authRouter)

app.use((req, res, next) => {
  console.log("coming here");
  console.log(req.body);
  if(req.body.accessToken){
  const token = req.body.accessToken;
  const options = { expiresIn: '2d' };
  const secret = process.env.JWT_SECRET;
  try{
    result = jwt.verify(token, secret, options);
    req.decoded = result;
    console.log(result);
    next('route');
  } catch(err){
    throw new Error(err);
  }
  }
  else{
    res.status(401).send({msg: "unauthorized"});
  }
});

require('./routes/protected')(app);

server.listen(process.env.PORT || 8080, () => {
  console.log('listening...')
})