const Movies = require('../models/Movies');

function index(req, res) { // busqueda de todas las pelúculas
    Movies.find({})
        .then(peliculas => {
            if (peliculas.length) return res.status(200).send({
                peliculas
            });
            return res.status(204).send({
                message: 'NO CONTENT'
            });
        })
        .catch(error => res.status(500).send({
            error
        }));

}

function show(req, res, next) {
    let query = {}
    query[req.params.key] = req.params.value;
    Movies.find(query)
        .then(peliculas => {
            if (!peliculas.length) return next();
            req.body.peliculas = peliculas;
            return next();
        })
        .catch(error => {
            req.body.error = error;
            next();
        })
    if (req.body.error) return res.status(500).send({
        error
    }); // si existe un error mandará status 500
    if (req.body.peliculas) return res.status(200).send({
        peliculas
    }); // si todo está bien mandará un status 200
    return res.status(404).send({
        message: 'NOT FOUND'
    }); // si no es ninguna de las anteriores retornara un
}


module.exports = {
    index,
    show
}