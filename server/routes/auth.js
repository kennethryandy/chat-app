const {Router} = require('express')
const passport = require('passport')

const router = Router()

passport.serializeUser(function(user, done) {
  done(null, user.id);  
});

passport.deserializeUser(function(id, done) {
  done(null, id)
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  console.log(req.user)
  res.json({
    userId: req.user.id,
    name: req.user.displayName,
    photo: req.user.photos[0].value,
    success: true
  })
})

router.get('/facebook/logout', (req, res) => {
  if(req.user) req.logout()
  res.json({message: 'logout successfully'})
})

module.exports = router