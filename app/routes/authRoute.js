const express = require('express');
const authC = require('../controllers/authController')
//const payload = require('../controllers/authController')
const ordenPeli = require('../controllers/orderController');



const router = express.Router();

router.post('/login', authC)
    .get('/', authC)


module.exports = router;