const Subscriber = require('../models/subscriber')

const createSubscriber = async (req, res) => {

  const { email } = req.body

  try {
    const existingSubscriber = await Subscriber.findOne({ email })
    if (existingSubscriber) {
      return res.status(409).json({ errors: ['You are already a subscriber'] })
    }

    const user = new Subscriber({
      email
    })
    delete user.password
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createSubscriber }
