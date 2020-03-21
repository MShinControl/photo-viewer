/**
 * ************************************
 *
 * @module localRouter.js
 * @description File that handles all requests that come into the back-end.
 *              & routes them to middleware -> read/write - databases/csv;
 *
 * ************************************
 */

const router = require('express').Router();
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');
const tokenController = require('../controllers/tokenController');

//Auth Endpoint
router.post('/signup', userController.saveUser, tokenController.createToken);
router.post('/login', userController.verifyUser, tokenController.verifyToken);

//Image Endpoint
router.get('/images/:page?', imageController.getImages);

module.exports = router;