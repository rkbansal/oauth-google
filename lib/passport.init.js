const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { Strategy: GithubStrategy} = require('passport-github')
const { 
  TWITTER_CONFIG, GOOGLE_CONFIG, FACEBOOK_CONFIG, GITHUB_CONFIG
} = require('../config')

module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb, b, c) => {
    console.log("serialization");
    console.log(user);
    console.log(b);
    console.log(c);
    cb(null, user)
  })
  passport.deserializeUser((obj, cb) => {
    console.log("deserialization");
    console.log(obj);
    cb(null, obj)
  })
  
  // The callback that is invoked when an OAuth provider sends back user 
  // information. Normally, you would save the user to the database 
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => {
    console.log("callback---");
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    cb(null, profile);
  }

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback))
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}