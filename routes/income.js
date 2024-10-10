const { addIncome, getIncomes }= require('../controllers/income');

const router = require('express').Router();

router.post('/add-income/:userId', addIncome);
router.get('/get-incomes/:userId', getIncomes);

module.exports = router;