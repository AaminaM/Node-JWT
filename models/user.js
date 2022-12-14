const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        unique: true,
        requried: true
    },
    password: {
        type: String,
        requried: true
    }
})
module.exports = mongoose.model("User", userSchema)
