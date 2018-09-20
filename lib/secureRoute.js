function secureRoute(req, res, next) {
  if(!req.session.userId) {
    //clear session and redirect to login
    return req.session.regenerate(() =>{
      res.redirect('/login');
    });
  }
  //allow request to reach destination
  next();
}

module.exports = secureRoute;
