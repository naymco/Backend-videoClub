const secretToken = require('jsonwebtoken');
const CONFIG = require('../config/config')

module.exports = function (req, res, next) {
    if (req.path != '/auth/login') {
        if (req.headers.authorization) { // con esta función compruebo el token que se encuentra en los headers
            let token = req.headers.authorization.split(' ')[1] // aquí le hago un split para convertirlo en un array con dos 
            //console.log(token)                                   valores, uno será el Bearer y el otro el token con posicion 1
            secretToken.verify(token, CONFIG.SECRET_KEY_TOKEN, function (error, decoded) {
                if (error) return res.status(403).send({ message: 'No tienes permisos', error });
                // console.log(decoded);
                next();
            })
        } else res.status(403).send({ message: 'No tienes suficientes permisos' });
    } else next();
}