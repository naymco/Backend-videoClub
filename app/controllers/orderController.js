const User = require('../models/Users');
const Movies = require('../models/Movies');
const ObjectId = require('mongodb').ObjectID;



function pedidoPeliculaAlquiler(req, res) {

    let title = new RegExp(req.body.title, 'i')
    const insertId = ObjectId(req.params.id)
    console.log(insertId)

    User.findOne({ _id: insertId }).then((userId, error) => {

        if (!userId) return res.status(404).send({ message: 'El ususario no existe' });
        if (error) return res.status(500).send({ message: 'NOT FOUND', error });

        Movies.findOne({ title: title }).then((movie) => {

            userId.alquiler_peli = movie.title;
            userId.peliculaPedida = movie.id;

            if (!title) return res.status(404).send({ message: 'Esta película no existe' });

            const fechaPedido = new Date();

            userId.fecha_pedido = fechaPedido.getDate() + '/' + (fechaPedido.getMonth() + 1) + '/' + fechaPedido.getFullYear();

            const tiempoAlquila = 4;
            userId.fecha_entrega = (fechaPedido.getDate() + tiempoAlquila) + '/' + (fechaPedido.getMonth() + 1) + '/' + fechaPedido.getFullYear();
            console.log(userId)

            userId.save().then(saved => {
                if (saved) return res.status(200).send({ message: 'Guardado correctamente', saved })
                return res.status(502).send({ message: 'Humo un error', error })
            }).catch(error => console.log(error));

        }).catch(error => res.status(503).send({ error }));
    }).catch(error => res.status(501).send({ error }));
}

module.exports = {
    pedidoPeliculaAlquiler
}
