const User = require('../models/user');

function auth(req, res, next) {
  //if no userId move to the next step of middleware
  if(!req.session.userId) return next();

  User.findById(req.session.userId, (err, user) => {
    //if no user, redirect back to login
    if(!user) req.session.regenerate(() => res.redirect('/'));
    //show/hide content
    res.locals.isAuthenticated = true;
    //modify content
    res.locals.currentUser = user;
    //user data in controllers
    req.currentUser = user;

    next();
  });
}

module.exports = auth;
