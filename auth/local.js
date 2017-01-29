//imports the passport module
const passport = require('passport');
//imports the passport strategy model
const LocalStrategy = require('passport-local').Strategy;
//prepares to call the functions in passport.js
const init = require('./passport');
//imports the database
const models = require('../db/models/index');
//imports the helper functions from auth helpers
const authHelpers = require('../auth/auth-helpers');
//this creates an empty object!
const options = {};
//this calls the functions in passport.js
init();

//this creates a new LocalStrategy class with the empty object
passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findAll({
    where: {
      username
    }
  })
//then do this:
  .then((user) => {
//if the user does not exist, then you don't need to go any further, the done function
//can return false because there is no way the passwords can match for user that doesn't have a password
    if (user[0] === undefined) {
      return done(null, false);
    }
//if there is a user, the comparsePass function from the authHelpers file compares the taken password
//with the one stored in the database. if they don't match:
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
//the process terminates again
      return done(null, false);
//but if they do match:
    } else {
//the user from the database is logged in
      return done(null, user[0].dataValues);
    }
  })
//for logging errors:
  .catch((err) => { return done(err); });
}));

//export the passport module
module.exports = passport;
