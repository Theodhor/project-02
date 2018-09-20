const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res) {
  User.create(req.body, (err, user) => {
    console.log(user);
    if(err) {
      req.flash('danger', 'wrong credentials format');
      return res.redirect('/registrations');
    }
    res.redirect('/register');
  });
}

function indexRoute(req, res) {
  User.find().sort({ name: 1 }).exec((err , registrations) => {
    res.render('registrations/index', { registrations });
  });
}

function editRoute(req, res){
  User.findById(req.params.id, (err, user) => {
    res.render('registrations/edit', { user });
  });
}

function updateRoute(req, res) {
  //we cannot make PUT request without method-methodOverride

  //without method override this route will never work!!!!
  User.findById(req.params.id, (err, photo)=> {
    photo.set(req.body);
    photo.save(() => {
      res.redirect(`/registrations/${req.params.id}`);
    });
  });
}

function showRoute(req, res){
  User.findById(req.params.id, (err, user) => {
    res.render('registrations/show', { user });
  });
}

function photosRoute(req, res) {
  User.findById(req.params.id).populate('photos').exec((err, user) => {
    res.render('registrations/photos', { user });
  });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  index: indexRoute,
  edit: editRoute,
  update: updateRoute,
  show: showRoute,
  photos: photosRoute
};
