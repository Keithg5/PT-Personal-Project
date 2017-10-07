const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userImages: []
});

module.exports = mongoose.model('User', UserSchema);