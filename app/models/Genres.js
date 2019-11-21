const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Genre = mongoose.model('generos', genreSchema);

module.exports = Genre;