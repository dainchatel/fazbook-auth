//import express
const express = require('express');
//import the router
const router = express.Router();
//import the authHelper functions
const authHelpers = require('../auth/auth-helpers');

//GET user profile page.
//this happens when the user tries to visit their profile page
//it goes through the loginRequired function, and if it passes
router.get('/', authHelpers.loginRequired, (req, res, next) => {
//then it renders the index ejs page in user folder
  res.render('user/index', {
//with this data
    user: req.user.dataValues
  });
});

//exports router
module.exports = router;
