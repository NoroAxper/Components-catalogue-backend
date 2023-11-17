const { createSubscriber } = require('../domain/subscriber')
const express = require('express')
const router = express.Router()

router.post('/', createSubscriber)

module.exports = router
