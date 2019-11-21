const express = require('express');
const genreC = require('../controllers/genreController');


const router = express.Router();



router.get('/', genreC.genreIndex)
    .get('/:genre', genreC.buscarGenero)


module.exports = router;