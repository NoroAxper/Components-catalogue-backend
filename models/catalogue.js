const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CatalogueSchema = new Schema({
  categories: [
    {
      category: { type: String, required: true },
      subcategories: [
        {
          subcategory: { type: String, required: true },
          subcategoryDetails: [
            {
              description: { type: String, required: true },
              codeSnippetJS: { type: String },
              codeSnippetCSS: { type: String },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Catalogue", CatalogueSchema);
