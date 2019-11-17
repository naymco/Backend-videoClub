const express = require('express');
const userC = require('../controllers/usersController');

const router = express.Router();

router.get('/', userC.index)
    .post('/', userC.create)
    .get('/:key/:value', userC.find, userC.show)
    .put('/:key/:value', userC.find, userC.update)
    .delete('/:key/:value', userC.find, userC.remove);

module.exports = router;