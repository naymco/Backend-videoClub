const User = require('../models/Users');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config')
const token = require('jsonwebtoken');

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username }).then(user => {
        if (!user) return res.status(404).send({ message: 'Usuario o contraseña incorrectos' });
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                //acceso
                payload = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    peliculaPedida: user.peliculaPedida,
                    fecha_pedido: user.fecha_pedido,
                    fecha_entrega: user.fecha_entrega,
                    alquiler_peli: user.alquiler_peli
                }

                token.sign(payload, CONFIG.SECRET_KEY_TOKEN, function (error, token) {
                    if (error) {
                        return res.status(500).send({ error });
                    } else {
                        if (payload.role === 'usuario' || payload.role === 'admin') {
                            return res.status(200).send({ message: `Bienvenido ${payload.name}. Este es tu token: ${token}`, payload })

                        } else res.status(403).send({ message: 'No eres usuario registrado' })
                    }
                })

            } else {
                //no hay acceso
                return res.status(404).send({ message: 'Usuario o password incorrecto' });
            }

        }).catch(error => {
            console.log(error);
            res.status(500).send({ error });
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({ error });
    });
}

module.exports = login;