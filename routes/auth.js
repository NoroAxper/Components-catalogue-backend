const express = require('express')
const router = express.Router()

const authenticateToken = require('../tokenAuth')

// Protected route that requires token authentication
router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted!', user: req.user })
})

module.exports = router
