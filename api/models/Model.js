const mongoose = require('mongoose');

const GeomtrySchema = mongoose.Schema({
    name: String,
    data: Buffer
});

module.exports = mongoose.model('models', GeomtrySchema);