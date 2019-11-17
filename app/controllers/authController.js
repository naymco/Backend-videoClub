const User = require('../models/Users');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config')

const token = require('jsonwebtoken');

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(404).send({ message: 'El usuario no existe' });
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    //acceso
                    payload = {
                        username: user.username,
                        email: user.email,
                        name: user.name
                    }
                    token.sign(payload, CONFIG.SECRET_KEY_TOKEN, function (error, token) {
                        if (error) {
                            res.status(500).send({ error });
                        } else {
                            res.status(200).send({ message: 'Acceso Concedido', token });
                        }
                    })

                } else {
                    //no hay acceso
                    return res.status(200).send({ message: 'Password incorrecto' });
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