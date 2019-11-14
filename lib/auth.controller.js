const jwt = require('jsonwebtoken');

exports.twitter = (req, res) => {
  const io = req.app.get('io')
  const user = { 
    name: req.user.username,
    photo: req.user.photos[0].value.replace(/_normal/, '')
  }
  io.in(req.session.socketId).emit('twitter', user)
  res.end()
}

exports.google = (req, res) => {
  console.log("=====end=====");
  console.log(req.user);
  // console.log(res);
  const io = req.app.get('io')
  const user = {
    name: req.user.name,
    email: req.user.email
    // photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  }
  console.log(req.session.socketId);
  const options = { expiresIn: '2d' };
  const secret = process.env.JWT_SECRET;
  const jwtToken = jwt.sign(user, secret, options);
  io.in(req.session.socketId).emit('google', {token: jwtToken, user: user})
  res.end();
}

exports.facebook = (req, res) => {
  const io = req.app.get('io')
  const { givenName, familyName } = req.user.name
  const user = { 
    name: `${givenName} ${familyName}`,
    photo: req.user.photos[0].value
  }
  io.in(req.session.socketId).emit('facebook', user)
  res.end()
}

exports.github = (req, res) => {
  const io = req.app.get('io')
  const user = { 
    name: req.user.username,
    photo: req.user.photos[0].value
  }
  io.in(req.session.socketId).emit('github', user)
  res.end()
} 