const express = require('express');
const router = express.Router();
const {signUp,logIn}  = require('../Controllers/auth');


router.post('/signUp',signUp);
router.post('/logIn',logIn);



module.exports = router;