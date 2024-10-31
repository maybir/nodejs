const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense');

const router = require('express').Router();

// Define routes for handling expenses
router.post('/add-expense/:userId', addExpense);               // Route to add a new expense
router.get('/get-expenses/:userId', getExpenses);              // Route to retrieve all expenses for a user
router.patch('/update-expense/:userId/:expenseId', updateExpense); // Route to update a specific expense
router.delete('/delete-expense/:userId/:expenseId', deleteExpense); // Route to delete a specific expense

module.exports = router;