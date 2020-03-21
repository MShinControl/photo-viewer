/**
 * ************************************
 *
 * @module imageController.js
 * @description Caches requests to read off of the imageCache. 
 *              Sends array of URLS as response.
 *
 * ************************************
 */

const urls = require('../database/csvParser');

const imageController = {};

//Cache
let imageCache = [];


/*
  NOTE: I'm well aware that this middleware does NOT need to be in a async await, try catch block.
        I was following best practices because normally you'd be reading off a CDN/SDK file or database.
        In THIS case we're reading off a local variable.
*/
imageController.getImages = async (req, res) => {
  //Get page from request query.
  const { page } = req.query
  let offset = 0; //Offset will always be 0 because we're are infinite scrolling in the front-end.
  let limit = page * 10; //Limit of caching and sending 10 at a time.

  imageCache = urls.slice(offset, limit); // Set cache per request.
  let data = imageCache.slice(offset, limit); //Response.

  try {
    //If request of pages is more than the items we have in our database send error.
    if(limit > urls.length) {
      return res
              .status(401)
              .json({ errorMessage: "Sorry! No more images to show." });
    }
    //Otherwise just send the response.
    return res
            .status(200)
            .json(data);
  } catch (error) {
    error ? console.error(error) : null;
    return res
            .status(400)
            .json({ errorMessage: 'Server Error 400: Unable to retreive image URLS'})
  }
}

module.exports = imageController;
