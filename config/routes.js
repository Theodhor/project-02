const router = require('express').Router();
const photosController = require('../controllers/photos');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

const images = [
  'https://www.kimballmidwestgiftstore.com/public/frontend/images/404.jpg',
  'https://speckyboy.com/wp-content/uploads/2010/03/four-oh-four_08.jpg',
  'http://www.technobaboy.com/wp-content/uploads/143.jpg',
  'http://www.laquintaresources.com/img/error-404-funny.jpg',
  'http://www.404lovers.com/wp-content/uploads/2014/08/frontend2011dotcom.jpg',
  'https://www.howtogeek.com/wp-content/uploads/2013/01/image87.png',
  'https://res.cloudinary.com/teepublic/image/private/s--07p5KPB8--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1515809341/production/designs/2275656_0.jpg',
  'http://www.404notfound.fr/assets/images/pages/img/mikandi.jpg',
  'https://www.geeksleague.be/wp-content/uploads/2013/11/exemple-page-erreur-404-620x320.png',
  'http://farm3.static.flickr.com/2330/2368496281_1c18192bc9_o.jpg',
  'https://cms-assets.tutsplus.com/uploads/users/30/posts/25489/image/plunk.png',
  'https://vignette.wikia.nocookie.net/geosheas-lost-episodes/images/1/1a/D%27oh.gif/revision/latest?cb=20170803125407',
  'https://www.oddee.com/wp-content/uploads/_media/imgs/articles2/a96984_e1.jpg',
  'http://slownews.kr/wp-content/uploads/2014/01/404-error-page-26.jpg',
  'https://i.ytimg.com/vi/KuLFXr7OPpc/hqdefault.jpg',
  'https://previews.123rf.com/images/lightwise/lightwise1508/lightwise150800076/44185374-404-error-page-not-found-concept-and-a-broken-or-dead-link-symbol-as-a-dog-emerging-from-a-hole-hold.jpg'
];


router.get('/', (req,res) => res.render('home'));

router.post('/photos/new', secureRoute, photosController.create);
router.get('/photos', photosController.index);

router.get('/photos/new', secureRoute, photosController.new);
router.post('/photos/:id/like', secureRoute, photosController.like);
router.get('/photos/:id', photosController.show);



router.get('/photos/:id/edit', secureRoute, photosController.edit);

router.post('/photos/:id/comments', secureRoute, photosController.createComment);

router.delete('/photos/:id/comments/:commentId', secureRoute, photosController.deleteComment);

router.put('/photos/:id', secureRoute, photosController.update);

router.delete('/photos/:id', secureRoute, photosController.delete);

router.get('/register', registrationsController.new);
router.post('/register', registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.get('/logout', sessionsController.delete);

router.get('/registrations/:id/edit', secureRoute, registrationsController.edit);
router.get('/registrations/:id/photos', registrationsController.photos);
router.put('/registrations/:id', secureRoute, registrationsController.update);
router.get('/registrations/:id', registrationsController.show);
router.get('/registrations', registrationsController.index);





router.route('/*').all((req, res) => {
  const image = images[Math.floor(Math.random() * images.length)];
  res.status(404).render('404', { image });
});


module.exports = router;
