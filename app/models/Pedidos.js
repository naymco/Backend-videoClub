const mongoose = require('mongoose');

const pedidosSchema = mongoose.Schema({
    pelicula_id: {
        type: String,
        required: true
    },
    fecha_actual: {
        type: Date,
        require: true,
    },
    fecha_de_recogida: {
        type: Date,
        require: true
    }

});

const Pedidos = mongoose.model('pedidos', pedidosSchema);
module.exports = Pedidos;