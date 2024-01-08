const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    company: String,
    productImage: String,
    userId: String,
});
module.exports = mongoose.model("products", productsSchema);