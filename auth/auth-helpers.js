//this imports the hasing module
const bcrypt = require('bcryptjs');
//this imports the migrated database
const models = require('../db/models/index');

//this is the function that compares the entered password to the one in the database
function comparePass(userPassword, databasePassword) {
//it has to call a bcrypt method so the hashed password will still work
  return bcrypt.compareSync(userPassword, databasePassword);
}

//this is an important part of the path that looks to see if there is already a current user
function loginRedirect(req, res, next) {
//if there is a truthy value for req.user it returns a json payload
  if (req.user) return res.status(401).json(
//the payload has the information below, "you are already logged in"
    { status: 'You are already logged in' }
  );
//this is an important part of the middleware function -- it calls the next link in the chain
//if there is no req.user
  return next();
}

//this function creates a user
function createUser(req, res) {
//this creates a variable that will be used to encrypt the user's entered password
  const salt = bcrypt.genSaltSync();
//this generates the hash that will be a combination of the user's entered password and the freshly
//generated salt
  const hash = bcrypt.hashSync(req.body.password, salt);
//this is the database method that creates a user
  return models.User.create({
//these are the columns in the table
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
//then the user is redirected to the homepage
  }).then(() => {
    res.redirect('/');
  });
}

//this is called if the user tries to access a page that requires login while not logged in
function loginRequired(req, res, next) {
//if there's no logged-in user, then the payload asks user to login
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
//then the next part of the chain is called
  return next();
}

//this exports these four functions so they can be called elsewhere
module.exports = {
  comparePass,
  loginRedirect,
  createUser,
  loginRequired
}
