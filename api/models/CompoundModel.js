const mongoose = require('mongoose');

const CompoundSchema = mongoose.Schema({
    name: String,
    g4name: String
});

module.exports = mongoose.model('Compound', CompoundSchema);