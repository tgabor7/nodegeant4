const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, unique: true},
    password: String,
    role: String
});

module.exports = mongoose.model('users', UserSchema);