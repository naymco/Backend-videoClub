const express = require('express');
const movieC = require('../controllers/moviesController');


const router = express.Router();

router.get('/', movieC.index)
    .get('/:key/:value', movieC.find, movieC.show)



module.exports = router;