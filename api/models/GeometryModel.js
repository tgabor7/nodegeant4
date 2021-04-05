const mongoose = require('mongoose');

const GeometrySchema = mongoose.Schema({
    name: String,
    data: Buffer
});

module.exports = mongoose.model('Model', GeometrySchema);