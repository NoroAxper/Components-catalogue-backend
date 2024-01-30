// const User = require('../models/user')

// const getUser = async (req, res) => {

//   try {
//     const existingUser = await User.findOne({ email: req.user.email })
//     if (!existingUser) {
//       return res.status(409).json({ errors: ['User not found'] })
//     }

//     res.status(200).json(existingUser)
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// }
// module.exports = { getUser }