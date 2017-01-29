//import express
const express = require('express');
//import router (actually name a variable called 'router' that calls the express method Router())
const router = express.Router();
//import the auth helpers functions
const authHelpers = require('../auth/auth-helpers');
//import the passport module
const passport = require('../auth/local');

//this defines the route for the registration page, it must have the loginRedirect function
//so if a user is already logged in, they are told so
router.get('/register', authHelpers.loginRedirect, (req, res, next)=> {
//renders the register view
  res.render('auth/register');
});

//creates a new user!
router.post('/register', (req, res, next)  => {
//calls that function from the helpers file
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

//this defines the route for the login page, it must have the loginRedirect function
//so if a user is already logged in, they are told so
router.get('/login', authHelpers.loginRedirect, (req, res, next)=> {
  res.render('auth/login');
});

//this calls the authenticate method and the local file where the hash is stored
router.post('/login', passport.authenticate('local', {
//if successful go to this user's profile
    successRedirect: '/user',
//if unsuccessful go back to login page
    failureRedirect: '/auth/login',
//"flashes" a failure message
    failureFlash: true
  })
);

//logout function
router.get('/logout', (req, res, next) => {
//logs out -- not sure where this logout method comes from, passport or wherever
  req.logout();
//redirects to home
  res.redirect('/');
});

//exports router
module.exports = router;
