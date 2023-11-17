const { createUser } = require('../domain/register')
const express = require('express')
const router = express.Router()

// GET
router.post('/', createUser)

module.exports = router
