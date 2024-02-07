const Catalogue = require('../models/catalogue')
const { uploadFile } = require('../s3')

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
    const { category, subcategories } = JSON.parse(req.body.data)
    const foundCategory = await Catalogue.findOne({ category })

    // Process the file
    const fileData = req.file
    const imageResult = await uploadFile(fileData)
    const imagePath = `images/${imageResult.Key}`

    if (!foundCategory) {
      // Create a new category
      const newCategory = new Catalogue({
        category,
        subcategories: [
          {
            subcategory: subcategories[0].subcategory,
            subcategoryDetails: [
              {
                description: subcategories[0].subcategoryDetails[0].description,
                imageUrls: [
                  {
                    imageUrl: imagePath
                  }
                ],
                codeSnippetJS:
                  subcategories[0].subcategoryDetails[0].codeSnippetJS,
                codeSnippetCSS:
                  subcategories[0].subcategoryDetails[0].codeSnippetCSS
              }
            ]
          }
        ]
      })
      const savedCategory = await newCategory.save()
      res.status(201).json(savedCategory)
    } else {
      // Add a new subcategory to an existing category
      const newSubcategory = {
        subcategory: subcategories[0].subcategory,
        subcategoryDetails: [
          {
            description: subcategories[0].subcategoryDetails[0].description,
            imageUrls: [
              {
                imageUrl: imagePath
              }
            ],
            codeSnippetJS: subcategories[0].subcategoryDetails[0].codeSnippetJS,
            codeSnippetCSS:
              subcategories[0].subcategoryDetails[0].codeSnippetCSS
          }
        ]
      }

      foundCategory.subcategories.addToSet(newSubcategory)

      const savedSubcategory = await foundCategory.save()
      res.status(201).json(savedSubcategory)
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const postImage = async (req, res) => {
  try {
    const { subcategory } = req.body

    // Process the file
    const fileData = req.file
    const imageResult = await uploadFile(fileData)
    const imagePath = `images/${imageResult.Key}`

    // Find the category containing the specified subcategory
    const foundCategory = await Catalogue.findOne({
      'subcategories.subcategory': subcategory
    })

    if (!foundCategory) {
      return res
        .status(404)
        .json({ message: 'Category not found for the specified subcategory.' })
    }

    // Find the subcategory and update its imageUrls
    const subcategoryIndex = foundCategory.subcategories.findIndex(
      (sub) => sub.subcategory === subcategory
    )
    foundCategory.subcategories[
      subcategoryIndex
    ].subcategoryDetails[0].imageUrls.push({ imageUrl: imagePath })
    console.log('this is foundcategory: ', foundCategory)
    // Save the updated category
    const savedCategory = await foundCategory.save()
    res.status(201).json(savedCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteCategory = async (req, res) => {
  const { category } = req.body
  try {
    const categoryToDelete = await Catalogue.findOneAndDelete({ category })
    if (!categoryToDelete) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({
      message: 'Category deleted successfully',
      deletedCategory: categoryToDelete
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteSubCategory = async (req, res) => {
  const { category, subcategories } = req.body
  const subcategory = subcategories[0].subcategory

  try {
    const categoryToDelete = await Catalogue.findOneAndUpdate(
      { category },
      { $pull: { subcategories: { subcategory } } },
      { new: true }
    )
    if (!categoryToDelete) {
      return res.status(404).json({ message: 'SubCategory not found' })
    }
    res.status(200).json({
      message: 'SubCategory deleted successfully',
      deletedCategory: categoryToDelete
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteImage = async (req, res) => {
  console.log('you are here', req.body)
  const { imageUrl } = req.body
  try {
    const imageToDelete = await Catalogue.findOneAndUpdate(
      { 'subcategories.subcategoryDetails.imageUrls.imageUrl': imageUrl },
      {
        $pull: {
          'subcategories.$.subcategoryDetails.$[].imageUrls': { imageUrl }
        }
      },
      { new: true }
    )

    if (!imageToDelete) {
      return res.status(404).json({ message: 'Image not found' })
    }
    res.status(200).json({
      message: 'Image deleted successfully',
      deletedImage: imageToDelete
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
//   const updateCategory = async (req, res) => {
//     try {
//       const { category, subcategory } = req.body;
//       const foundCategory = await Catalogue.findOne({ category });

//       if (foundCategory !== null) {
//         const updatedCategory = await Catalogue.updateOne(
//           { category },
//           { $push: { subcategories: subcategory } }
//         );

//         console.log(updatedCategory);
//         res.status(201).json(updatedCategory);
//       } else {
//         // Handle the case when the category is not found
//         res.status(404).json({ message: 'Category not found' });
//       }
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };

module.exports = {
  getCategories,
  postCategory,
  deleteCategory,
  deleteSubCategory,
  postImage,
  deleteImage
}
