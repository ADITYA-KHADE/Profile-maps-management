const mongoose = require('mongoose');

const ProductModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
});

const ProductModel = mongoose.model('Product', ProductModelSchema)

module.exports = ProductModel