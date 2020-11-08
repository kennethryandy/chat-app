const passport = require('passport')
const FacebookStrategy = require('passport-facebook')

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:4000/api/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
},
(accessToken, refreshToken, profile, cb) => {
  console.log(accessToken)
  return cb(null, profile)
}
));