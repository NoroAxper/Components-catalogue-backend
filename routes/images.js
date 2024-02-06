const express = require('express');
const multer = require('multer');
const Image = require('../models/image');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename, originalname } = req.file;
    const subcategory = req.query.subcategory; // Retrieve subcategory from query parameter

    // Create a new Image with the subcategory name
    const newImage = new Image({ filename, originalname, subcategory });
    await newImage.save();

    res.json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:subcategoryName', async (req, res) => {
  try {
    const { subcategoryName } = req.params;

    // Assuming 'subcategory' is the field in the Image model that stores the subcategory name
    const images = await Image.find({ subcategory: subcategoryName });

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
