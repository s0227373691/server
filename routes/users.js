const express = require('express');
const router = express.Router();

const auth = require('./users/auth');
const register = require('./users/register');

router.use('/auth', auth);
router.use('/register', register);

module.exports = router;
