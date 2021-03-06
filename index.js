const express = require('express');
const app = express();
const port = 8080;

const {User} = require('./models');

app.get('/', (req, res) => {
  res.send("Hi");
});

app.get('/create', async (req, res) => {
  const user = new User({
    name: 'Raj',
    role: '1'
  });
  user.save(function(err){
    if (err) res.send(err);
    // console.log(user);
    res.send(user);
  });
})

app.listen(port, ()=>console.log(`listening on port: ${port}`));