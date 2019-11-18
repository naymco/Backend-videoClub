const Genre = require('../models/Genres');

function genreIndex(req, res) {
    Genre.find({})
        .then(genero => {
            if (genero.length) return res.status(200).send({ genero });
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(error => res.status(500).send({ error }));
}

function genreShow(req, res, next) {
    let query = {}
    query[req.body.genero];
    Genre.find(query).then(genero => {
        if (!genero.length) return next();
        req.body.genero = genero;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
    if (req.body.error) return res.status(500).send({ error })
    if (req.body.genero) return res.status(200).send({ genero });
    return res.status(404).send({ message: 'NOT FOUND' });
}

module.exports = {
    genreIndex,
    genreShow
}