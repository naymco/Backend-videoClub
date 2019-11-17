const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    adult: {
        type: Boolean,
        default: false,
        required: true
    },
    genre_ids: {
        type: String,
        required: true,

    },
    overview: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    }


})

const Movies = mongoose.model('peliculas', MovieSchema);
module.exports = Movies;