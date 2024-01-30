const mongoose = require('mongoose')

const Schema = mongoose.Schema
const subcategoryDetailsSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  codeSnippetsJS: {
    type: String,
    required: true
  },
  codeSnippetsCSS: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})
const subcategorySchema = new Schema({
  subcategory: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  subcategoryDetails: [subcategoryDetailsSchema]
})

const CatalogueSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Catalogue', CatalogueSchema)
