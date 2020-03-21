const urls = require('../database/csvParser');

const imageController = {};

let imageCache = {};

imageController.getImages = async (req, res) => {
  const { page } = req.query
  try {
    if(imageCache[page]) {
      return res
              .status(200)
              .json(imageCache[page]);
    } else {
      let limit = +`${page}0`
      let offset = limit-10;
      imageCache[page] = urls.slice(offset, limit);

      return res
              .status(200)
              .json(imageCache[page]);
    }
  } catch (error) {
    error ? console.error(error) : null;
    return res
            .status(400)
            .json({ errorMessage: 'Server Error 400: Unable to retreive image URLS'})
  }
}

module.exports = imageController;
