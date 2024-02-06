const multer = require('multer')
const {
  getCategories,
  postCategory,
  deleteCategory,
  deleteSubCategory,
  postImage
} = require('../domain/catalogue')
const express = require('express')
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', getCategories)
router.post('/', upload.single('image'), handleFileUpload, postCategory)
router.post('/image',upload.single('image'), handleFileUpload, postImage)
router.delete('/', deleteCategory)
router.delete('/subcategory', deleteSubCategory)

function handleFileUpload(req, res, next) {
  console.log('Received file:', req.file)
  console.log('Received form data:', req.body)
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file was uploaded.' })
    }

    req.uploadedFile = req.file // Attach file to the request object
    next()
  } catch (error) {
    console.error('Error processing file upload:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = router
