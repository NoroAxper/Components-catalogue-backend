const { login } = require('../domain/login')
const express = require('express')
const router = express.Router()

router.post('/', login)

module.exports = router
