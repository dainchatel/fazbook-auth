//this imports the passport module and the database
const passport = require('passport');
const models = require('../db/models/index');

//this exports the serializeUser method and the deserializeUser method
module.exports = () => {
//this converts user data from a json object into something that the computer can store in session memory
  passport.serializeUser((user, done) => {
//this done function can throw an error or store the user.id of the current session
    done(null, user.id);
  });
//this converts data from session memory into a json object to be stored for later use
  passport.deserializeUser((id, done) => {
//this calls a method of the User database and finds a row by its ID
    models.User.findById(id)
//takes this user and puts the user inside a json object
    .then((user) => { done(null, user); })
//or catches and throws an error
    .catch((err) => { done(err, null); });
  });
};
