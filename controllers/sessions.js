const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res) {
  //find the user and verify password once hashed matches the hashed password in the db
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user || !user.validatePassword(req.body.password)) {
      req.flash('danger', 'invalid credentials');
      return res.redirect('/login');
    }

    req.session.userId = user._id;

    res.redirect('/registrations');
  });
}

function deleteRoute(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
