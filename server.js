const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const app = require('./app/app');

Database.connect();

app.listen(CONFIG.PORT, (error) => {
    if (error) return console.log(error);
    console.log('Conectado al puerto:', CONFIG.PORT);
})