const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectID;

const UserSchema = new mongoose.Schema({
    
    id: String,
    name: String,
    username: String,
    role: {
        type: String,
        default: 'usuario'
    },
    email: String,
    password: String,
    peliculaPedida: String,
    alquiler_peli: String,
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
