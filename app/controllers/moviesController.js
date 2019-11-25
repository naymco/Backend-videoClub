const Movies = require('../models/Movies');


function index(req, res) { // busqueda de todas las pelúculas
    Movies.find({})
        .then(peliculas => {
            if (peliculas.length) return res.status(200).send({ peliculas }); // si hay peliculas retornalas
            return res.status(204).send({ message: 'NO CONTENT' }); // sino retorna que no hay contenido
        })
        .catch(error => res.status(500).send({ error })); //si ocurre un error al buscar las peliculas lo enviará

}

function show(req, res) {

    if (req.params.error) return res.status(500).send({ error });
    if (!req.body.peliculas) return res.status(404).send({ message: 'NOT FOUND' });
    let peliculas = req.body.peliculas;
    return res.status(200).send({ peliculas });
}

function find(req, res, next) { // Función de búsqueda que usarán parte de las funciones de arriba. es un middleware
    let query = {};
    query[req.params.key] = req.params.value;
    Movies.find(query).then(peliculas => {
        if (!peliculas.length) return next();
        req.body.peliculas = peliculas;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
}

function buscarTitulo(req, res) {

    let titleName = new RegExp(req.params.title, "i");

    Movies.find({ title: titleName }, (error, movie) => {
        if (error) return res.status(500).send({ message: error })
        if (!titleName) return res.status(500).send({ message: 'La pelicula no existe' })
        return res.status(200).send(movie)
    })
}

module.exports = {
    index,
    show,
    find,
    buscarTitulo
}