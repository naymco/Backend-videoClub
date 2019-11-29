const express = require('express');
const bodyParser = require('body-parser');

const Movies = require('./routes/moviesRoute');
const User = require('./routes/userRoute');
const Auth = require('./routes/authRoute');
const Genres = require('./routes/genreRoute');
const Order = require('./routes/orderRoute');

const authToken = require('./middlewares/authToken');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE");
    next();
});

app.use(bodyParser.json()); // permite peticiones y enviar respuestas en formato json
app.use(bodyParser.urlencoded({ extended: false })); // no vamos a recibir peticiones directamente desde un formulario

//middlewares
//app.use(authToken);

// Routes 

app.use('/movie', Movies);
app.use('/genre', Genres);
app.use('/user', User);
app.use('/auth', Auth);
app.use('/order', Order);




module.exports = app;
