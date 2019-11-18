const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String
    }

});

const Genre = mongoose.model('genero', genreSchema);

module.exports = Genre;