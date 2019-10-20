const express = require('express');
const app = express();
const port = 3000;

const models = require('./schema');
const UserModel = models.UserModel;

app.get('/', (req, res) => {
  res.send("Hi");
});

app.get('/create', async (req, res) => {
  const user = new UserModel({
    name: 'Raj',
    role: '1'
  });
  user.save(function(err){
    if (err) res.send(err);
    console.log(user);
    res.send(user);
  });
})

app.listen(port, ()=>console.log(`listening on port: ${port}`));