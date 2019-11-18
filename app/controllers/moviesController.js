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

    if (req.body.error) return res.status(500).send({ error });
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


module.exports = {
    index,
    show,
    find
}