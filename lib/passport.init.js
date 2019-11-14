const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
// const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: GithubStrategy} = require('passport-github')
const { 
  TWITTER_CONFIG, GOOGLE_CONFIG, FACEBOOK_CONFIG, GITHUB_CONFIG
} = require('../config')
const {User} = require('../models');

module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, done) => {
    console.log("serialization");
    //User will be our db user recored
    console.log(user);
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    console.log("deserialization");
    User.findById(id).then((user) => {
      console.log(user);
      done(null, user);
    });
  })
  
  // The callback that is invoked when an OAuth provider sends back user 
  // information. Normally, you would save the user to the database 
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => {
    console.log("callback---");
    User.findOrCreate({
      ouathid: profile.id,
      type: 'google',
      email: profile && profile.emails && profile.emails[0] && profile.emails[0].value
    },
    {
      ouathid: profile.id,
      provider: "google",
      name: profile.displayName,
      email: profile && profile.emails && profile.emails[0] && profile.emails[0].value
    }, (err, user) => {
      console.log(err);
      console.log(user);
      if(!err){
        //it will go to the serializeUser cb
        cb(null, user);
      }
    });
  }

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}