const express = require('express');
const genreC = require('../controllers/genreController');
const Movie = require('../models/Movies')
const router = express.Router();



router.get('/', genreC.genreIndex)
    .get('/:genero', genreC.genreShow);

module.exports = router;