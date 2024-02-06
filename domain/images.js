const Image = require('../models/image');

const fetchImages = async () => {
  try {
    const images = await Image.find();
    return images;
  } catch (error) {
    throw new Error('Error fetching images');
  }
};

module.exports = { fetchImages };