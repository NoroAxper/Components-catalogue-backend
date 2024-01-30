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
      const { category, subcategories } = req.body
      const foundCategory = await Catalogue.findOne({ category })
  
      if (!foundCategory) {
        const newCategory = new Catalogue({
          category,
          subcategories: [
            {
              subcategory: subcategories[0].subcategory,
              subcategoryDetails: [
                {
                  description: subcategories[0].subcategoryDetails[0].description,
                  codeSnippetsJS:
                    subcategories[0].subcategoryDetails[0].codeSnippetsJS,
                  codeSnippetsCSS:
                    subcategories[0].subcategoryDetails[0].codeSnippetsCSS
                }
              ]
            }
          ]
        })
  
        const savedCategory = await newCategory.save()
        res.status(201).json(savedCategory)
      } else {
        foundCategory.subcategories.addToSet({
          subcategory: subcategories[0].subcategory,
          subcategoryDetails: [
            {
              description: subcategories[0].subcategoryDetails[0].description,
              codeSnippetsJS: subcategories[0].subcategoryDetails[0].codeSnippetsJS,
              codeSnippetsCSS:
                subcategories[0].subcategoryDetails[0].codeSnippetsCSS
            }
          ]
        })
  
        const savedSubcategory = await foundCategory.save()
        res.status(201).json(savedSubcategory)
      }
    } catch (error) {
      res.status(400).json({ message: error.message })
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

module.exports = { getCategories, postCategory }
