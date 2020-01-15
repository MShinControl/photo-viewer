const { apiCall } = require('../fetch/api');

const imageController = {};

imageController.getImages = async (req, res, next) => {
  try {
    const imageUrls = await apiCall();
    res.locals.imageUrls = imageUrls;
    return next();
  } catch (error) {
    return error ? console.error(error) : null;
  }
}

module.exports = imageController;