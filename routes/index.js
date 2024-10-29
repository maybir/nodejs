const router = require('express').Router();

router.use(require('./user'));
router.use(require('./income'));
router.use(require('./expense'));

module.exports = router;