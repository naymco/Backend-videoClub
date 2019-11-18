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
    },
    adult: {
        type: Boolean,
        default: false,
    },
    overview: {
        type: String
    },
    popularity: {
        type: Number
    },
    genre_ids: {
        type: Number,
        ref: 'genero'
    }

})

const Movies = mongoose.model('peliculas', MovieSchema);
module.exports = Movies;