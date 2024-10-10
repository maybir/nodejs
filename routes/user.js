const { signUp, signIn, logOut } = require('../controllers/user');

const router = require('express').Router();

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/log-out', logOut)

module.exports = router;