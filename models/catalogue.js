// const mongoose = require('mongoose')

// const Schema = mongoose.Schema
// const UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// })

// module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CatalogueSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    subcategory: [subcategorySchema]
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

