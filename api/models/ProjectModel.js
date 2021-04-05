const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    data: String,
    user: String
});

module.exports = mongoose.model('Project', ProjectSchema);