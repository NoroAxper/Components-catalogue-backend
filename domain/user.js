const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT
const secret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ errors: ['Username in use, please login'] })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      password: hash
    })
    delete user.password
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!username) {
      return res.status(400).json({ error: ['Please enter username'] })
    }
    if (!password) {
      return res.status(400).json({ error: ['Please enter your password'] })
    }
    if (!user) {
      return res.status(404).json({ error: ['User not found, please Sign up'] })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: ['Wrong password'] })
    }
    const token = jwt.sign({ username, userId: user._id }, secret)
    res.status(200).json(token)
    console.log(token)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
module.exports = { createUser, login }
