const express = require('express');
const router = express.Router();
const {
    signupValidator,
    signinValidator,
    validatorResult,
    passwordreset
} = require('../validator');
const { signupController,signinController } = require('../controllersauth');

router.post('/signup', signupValidator, validatorResult, signupController);
router.post('/signin', signinValidator, validatorResult, signinController);
module.exports = router;