const express = require('express');
const orderFilm = require('../controllers/orderController');

router = express.Router();

router.post('/:id', orderFilm.pedidoPeliculaAlquiler);


module.exports = router;