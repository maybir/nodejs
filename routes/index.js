const router = require('express').Router();

router.use(require('./user'));
router.use(require('./income'));

module.exports = router;