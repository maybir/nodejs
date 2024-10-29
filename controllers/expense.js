const { expenseSchema } = require('../lib/validation/expense');  // Import validation schema
const User = require('../models/user');                           // Import User model
const Expense = require('../models/expense');                     // Import Expense model
const { z } = require('zod');
const { userIdValidation } = require('../lib/validation/user');   // Import User ID validation

// Controller to add a new expense
const addExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);              // Validate userId from request params
        const { title, description, amount, tag, currency } = expenseSchema.parse(req.body); // Validate expense data

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new expense document
        const expense = new Expense({
            title,
            description,
            amount,
            tag,
            currency,
        });

        // Save the expense and associate it with the user
        await expense.save();
        userExists.expenses.push(expense);
        await userExists.save();
        return res.status(201).json({ message: "Expense added" });

    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Controller to retrieve expenses for a user
const getExpenses = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);              // Validate userId from request params
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Retrieve all expenses associated with the user
        const expenses = await Expense.find({ _id: { $in: userExists.expenses } });
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to update an existing expense
const updateExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);              // Validate userId from request params
        const expenseId = req.params.expenseId;

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the expense exists and belongs to the user
        const expense = await Expense.findOne({ _id: expenseId, _id: { $in: userExists.expenses } });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or does not belong to user' });
        }

        // Update only provided fields in the expense
        const { title, description, amount, tag, currency } = req.body;
        if (title !== undefined) expense.title = title;
        if (description !== undefined) expense.description = description;
        if (amount !== undefined) expense.amount = amount;
        if (tag !== undefined) expense.tag = tag;
        if (currency !== undefined) expense.currency = currency;

        await expense.save();
        return res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to delete an expense
const deleteExpense = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);              // Validate userId from request params
        const expenseId = req.params.expenseId;

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the expense exists and belongs to the user
        const expenseIndex = userExists.expenses.indexOf(expenseId);
        if (expenseIndex === -1) {
            return res.status(404).json({ message: 'Expense not found or does not belong to user' });
        }

        // Remove the expense from user's expense array and delete the expense document
        userExists.expenses.splice(expenseIndex, 1);
        await userExists.save();
        await Expense.findByIdAndDelete(expenseId);

        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
