// const { createUser } = require('../domain/register')
// const express = require('express')
// const router = express.Router()

// // GET
// router.post('/', createUser)

// module.exports = router

const {
  getCategories,
  postCategory,
  deleteCategory,
  deleteSubCategory
} = require('../domain/catalogue')
const express = require('express')
const router = express.Router()
router.get('/', getCategories)
router.post('/', postCategory)
router.delete('/', deleteCategory)
router.delete('/subcategory', deleteSubCategory)
// router.patch('/', updateCategory)
module.exports = router
