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
      const { categories } = req.body;
  
      const foundCategory = await Catalogue.findOne({
        'categories.category': categories[0].category,
      });
  
      if (!foundCategory) {
        const newCategory = new Catalogue({
          categories: [
            {
              category: categories[0].category,
              subcategories: [
                {
                  subcategory: categories[0].subcategories[0].subcategory,
                  subcategoryDetails: [
                    {
                      description:
                        categories[0].subcategories[0].subcategoryDetails[0]
                          .description,
                      codeSnippetJS:
                        categories[0].subcategories[0].subcategoryDetails[0]
                          .codeSnippetJS,
                      codeSnippetCSS:
                        categories[0].subcategories[0].subcategoryDetails[0]
                          .codeSnippetCSS,
                    },
                  ],
                },
              ],
            },
          ],
        });
  
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
      } else {
        foundCategory.categories[0].subcategories.push({
          subcategory: categories[0].subcategories[0].subcategory,
          subcategoryDetails: [
            {
              description:
                categories[0].subcategories[0].subcategoryDetails[0].description,
              codeSnippetJS:
                categories[0].subcategories[0].subcategoryDetails[0]
                  .codeSnippetJS,
              codeSnippetCSS:
                categories[0].subcategories[0].subcategoryDetails[0]
                  .codeSnippetCSS,
            },
          ],
        });
  
        const savedSubcategory = await foundCategory.save();
        res.status(201).json(savedSubcategory);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

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
