// const { createUser } = require('../domain/register')
// const express = require('express')
// const router = express.Router()

// // GET
// router.post('/', createUser)

// module.exports = router

const {
  getCategories,
  postCategory,
  deleteCategory
} = require('../domain/catalogue')
const express = require('express')
const router = express.Router()
router.get('/', getCategories)
router.post('/', postCategory)
router.delete('/', deleteCategory)
// router.patch('/', updateCategory)
module.exports = router
