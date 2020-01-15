const express = require('express');
const localRouter = express.Router();

/*
  getImages is a middleware from the imageController that saves the result of
  the api call to res.locals.
*/
const { getImages } = require('../controllers/imageController');

localRouter.get('/images', getImages);

module.exports = localRouter;