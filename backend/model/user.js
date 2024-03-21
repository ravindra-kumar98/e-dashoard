const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    occupation: String,
    age: Number,
    dob: Date,
    gender: String,
    phone: String
});
module.exports = mongoose.model("users", usersSchema);