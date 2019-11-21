const express = require('express')
const pedidosC = require('../controllers/pedidosController');

const router = express.Router();

router.get('/', pedidosC.indexPedidos)
    .post('/:id')


module.exports = router;