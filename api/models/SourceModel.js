const mongoose = require('mongoose');

const SourceSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Source', SourceSchema);