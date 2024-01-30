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
const Catalogue = require('../models/catalogue')

const getCategories = async (req, res) => {
  try {
    const categories = await Catalogue.find()
    return res.status(200).json(categories)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const postCategory = async (req, res) => {
  try {
    const { category } = req.body
    const newCategory = new Catalogue({
      category
    })
    const savedCategory = await newCategory.save()
    res.status(201).json(savedCategory)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
}
module.exports = { getCategories, postCategory }
