const router = require('express').Router();
const photosController = require('../controllers/photos');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

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





router.route('/*').all((req, res) => res.status(404).render('404'));


module.exports = router;
