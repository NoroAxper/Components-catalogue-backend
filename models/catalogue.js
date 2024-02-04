const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CatalogueSchema = new Schema({
  category: { type: String, required: true },
  subcategories: [
    {
      subcategory: { type: String, required: true },
      subcategoryDetails: [
        {
          description: { type: String, required: true },
          codeSnippetJS: { type: String, required: true },
          codeSnippetCSS: { type: String, required: true }
        }
      ]
    }
  ]
})

module.exports = mongoose.model('Catalogue', CatalogueSchema)
