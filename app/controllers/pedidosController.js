const Pedidos = require('../models/Pedidos');
const Movies = require('../models/Users');
const User = require('../models/Users');

function indexPedidos(req, res) {
    let pedidoPelicula = req.body.peliculas
    let userPedido = req.body.user
    Movies.findById({ pedidoPelicula })
        .then(pedido => {
            if (!pedido) return res.status(500).send({ message: 'El código de la película es incorrecto' })
            return res.status(200).send({ pedido })
        }).catch(error => res.status(404).send({ error }));
}

function find(req, res, next) {
    let query = {}
    query[req.params.key] = req.params.value;
    Pedidos.find(query).then(pedido => {
        if (!pedido.length) return next();
        req.body.pedido = pedido;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    })
}



module.exports = {
    indexPedidos,
    find
}