const Genre = require('../models/Genres');
const Movies = require('../models/Movies')

function genreIndex(req, res) {
    Genre.find({})
        .then(generos => {
            if (generos.length) return res.status(200).send({ generos });
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(error => res.status(500).send({ error }));
}

function genreShow(req, res, next) {
    let query = {}
    query[req.body.generos];
    Genre.find(query).then(genero => {
        if (!genero.length) return next();
        req.body.generos.name = generos;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
    if (req.body.error) return res.status(500).send({ error })
    if (req.body.generos) return res.status(200).send({ generos });
    return res.status(404).send({ message: 'NOT FOUND' });
}

function buscarGenero(req, res) {
    genre = new RegExp(req.params.genre, "i")

    Genre.find({ name: genre }, (error, movie) => {
        if (error) return res.status(500).send({ message: 'Error al guardar los datos: ', error })
        if (!genre) return res.status(404).send({ message: 'Genero introducido no valido.' })

        movieGenre = movie
        movieGenreId = parseInt(movieGenre[0].id)

        Movies.find({ genre_ids: movieGenreId }, (error, movie) => {
            if (error) return res.send("Error en la busqueda: ", error)
            if (!movieGenreId) return res.send({ message: 'No existe ese genero' })
            return res.status(200).send(movie)
        })

    })

}

module.exports = {
    genreIndex,
    genreShow,
    buscarGenero
}