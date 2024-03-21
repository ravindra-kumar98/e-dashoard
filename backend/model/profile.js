const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    profile: String,
    address: String,
    fullName: String,
    occupation: String,
    Age: String,
    dob: String,
    gender: String,
    phone: String,
});
module.exports = mongoose.model("profile", profileSchema);