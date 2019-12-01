const express = require('express');
const movieC = require('../controllers/moviesController');


const router = express.Router();

router.get('/', movieC.index)
    .get('/:id', movieC.find, movieC.show)
    .get('/title/:title', movieC.buscarTitulo)






module.exports = router;
