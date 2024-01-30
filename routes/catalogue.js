// const { createUser } = require('../domain/register')
// const express = require('express')
// const router = express.Router()

// // GET
// router.post('/', createUser)

// module.exports = router

const { getCategories, postCategory } = require('../domain/catalogue')
const express = require('express')
const router = express.Router()
router.get('/', getCategories)
router.post('/', postCategory)
module.exports = router
