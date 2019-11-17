const express = require('express');
const authC = require('../controllers/authController')

const router = express.Router();

router.post('/login', authC);


module.exports = router;