const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
    /* id: {
        type: Number,
        unique: true
    } */
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
            'invitado', // 
            'usuario', // 
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
    alquiler_peli: String,
    peliculaPedida: ObjectId,
    fecha_pedido: String,
    fecha_entrega: String
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