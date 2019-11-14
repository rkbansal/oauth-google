module.exports = (app) => {
  app.post('/isAuthenticated', (req, res) => {
    res.send({msg: "authenticated user"});
  });
}