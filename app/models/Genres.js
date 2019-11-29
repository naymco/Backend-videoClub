const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;