const bcrypt = require('bcrypt')
const User = require('../models/user')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const createUser = async (req, res) => {
  console.log(req.body)
  const { email, password, username } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ errors: ['Email is already in use, please login'] })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      email,
      password: hash
    })
    delete user.password
    const newUser = await user.save()
    const token = jwt.sign({ email }, secret)
    res.status(200).json({ user: newUser, token: token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createUser }
