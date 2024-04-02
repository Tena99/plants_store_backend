const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  en: {
    name: {
      type: String,
      required: true,
    },
  },
  de: {
    name: {
      type: String,
      required: true,
    },
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;
