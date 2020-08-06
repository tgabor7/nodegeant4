const mongoose = require('mongoose');

const GeomtrySchema = mongoose.Schema({
    name: String,
    vertices: Array,
    normals: Array
});

module.exports = mongoose.model('geometries', GeomtrySchema);