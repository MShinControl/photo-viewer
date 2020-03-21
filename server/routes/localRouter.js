const router = require('express').Router();
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');
const tokenController = require('../controllers/tokenController');


router.post('/signup', userController.saveUser, tokenController.createToken);
router.post('/login', userController.verifyUser, tokenController.verifyToken);

router.get('/images/:page?', imageController.getImages);
// router.post('/images');

module.exports = router;