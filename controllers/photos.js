const Photo = require('../models/photo');


function indexRoute(req, res) {
  Photo.find().sort({ name: 1 }).populate('user').exec((err , photos) => {
    res.render('photos/index', { photos });
  });
}

function showRoute(req, res){
  Photo.findById(req.params.id).populate('user comments.user').exec((err, photo) => {
    res.render('photos/show', { photo });
  });
}

function newRoute(req,res){
  res.render('photos/new');
}

function createRoute(req, res){
  //req.body contains form data, cause bodyparser puts it there
  // without bodyparser there is no rew.body!!

  req.body.user = req.currentUser; // this adds the user to the photo!!!!

  Photo.create(req.body, (err, photo) => {
    console.log(photo);
    res.redirect('/photos');
  });
}

function editRoute(req, res){
  Photo.findById(req.params.id, (err, photo) => {
    res.render('photos/edit', { photo });
  });
}

function updateRoute(req, res) {
  //we cannot make PUT request without method-methodOverride

  //without method override this route will never work!!!!
  Photo.findById(req.params.id, (err, photo)=> {
    photo.set(req.body);
    photo.save(() => {
      res.redirect(`/photos/${req.params.id}`);
    });
  });
}

function deleteRoute(req, res) {
  //we cannot make PUT request without method-methodOverride

  //without method override this route will never work!!!!
  Photo.findById(req.params.id, (err, photo)=> {
    photo.remove(() => {
      res.redirect('/photos');
    });
  });
}

function createCommentRoute(req, res) {
  req.body.user = req.currentUser;
  Photo.findById(req.params.id, (err, photo) => {
    photo.comments.push(req.body);
    photo.save(() => {
      res.redirect(`/photos/${req.params.id}`);
    });
  });
}

function deleteCommentRoute(req, res) {
  // find photo, find comment, remove comment, save photo, redirect showpage
  Photo.findById(req.params.id, (err, photo) => {
    console.log(err, photo);
    if(!photo.user){
      return res.redirect(`/photos/${req.params.id}`);
    }
    const comment = photo.comments.id(req.params.commentId);
    comment.remove();
    photo.save(() => {
      res.redirect(`/photos/${req.params.id}`);
    });
  });
}

function likeRoute(req, res) {
  //we cannot make PUT request without method-methodOverride

  //without method override this route will never work!!!!
  Photo.findById(req.params.id, (err, photo)=> {
    if(!photo.likes.find(like => like.equals(req.currentUser._id))){
      photo.likes.push(req.currentUser._id);
    } else {
      photo.likes = photo.likes.filter(like => !like.equals(req.currentUser._id));
    }
    photo.save(() => {
      res.redirect(`/photos/${req.params.id}`);
      console.log(photo.likes);

    });
  });
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  like: likeRoute
};
