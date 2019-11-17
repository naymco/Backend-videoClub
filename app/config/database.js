const mongoose = require('mongoose');
const CONFIG = require('./config');


module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(CONFIG.DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            .then(connection => {
                this.connection = connection;
                console.log('Conexion a db correcta')
            })
            .catch(error => console.log(error));
    }
}