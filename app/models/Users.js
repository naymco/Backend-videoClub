const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'usuario',
        enum: [
            'invitado', // GET, buscar y filtrar
            'usuario', // GET, PUT buscar, filtrar y modificar
            'admin' // GET, PUT, POST, DELETE  // puede hacerlo todo 
        ]
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sign_up_date: {
        type: Date,
        default: Date.now()
    },
    last_login_date: {
        type: Date,
        default: Date.now()
    },
    pedido: {
        type: String,
        required: true
    },
    fecha_pedido: {
        type: Date,
        required: true,
        default: Date.now()
    },
    fecha_entrega: {
        type: Date,
        required: true
    }
});
UserSchema.pre('save', function (next) { // funcion para encriptar el password, esto funciona cada vez que se ejecute el 'save' en los controladores
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error))
    }).catch(error => next(error));
});
const User = mongoose.model('user', UserSchema);

module.exports = User;