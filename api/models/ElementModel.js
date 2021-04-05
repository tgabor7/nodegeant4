const mongoose = require('mongoose');

const ElementSchema = mongoose.Schema({
    name: String,
    z: Number,
    symbol: String,
    g4name: String
});

module.exports = mongoose.model('Element', ElementSchema);