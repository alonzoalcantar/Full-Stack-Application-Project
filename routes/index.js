var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//OAuth routes

//OAuth Login 

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }) 
  );

  //OAUth Callback Route

  router.get('/oauth2callback',
  passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/',
  })
  );


  //OAuth Logout Route

  router.get('/logout', function(req, res){
    req.logout(function(err){
      if(err) {
        return next (err);
      }
      res.redirect('/');
    });
  });

module.exports = router;
