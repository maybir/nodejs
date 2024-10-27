const { incomeSchema } = require('../lib/validation/income');
const User = require('../models/user');
const Income = require('../models/income');
const { z } = require('zod');
const { userIdValidation } = require('../lib/validation/user');

const addIncome = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const { title, description, amount, tag, currency } = incomeSchema.parse(req.body);

        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const income = new Income({
            title,
            description,
            amount,
            tag,
            currency,
        });

        await income.save();
        userExists.incomes.push(income);
        await userExists.save();
        return res.status(201).json({ message: "Income added" });

    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getIncomes = async(req,res)=>{
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const userExists = await User.findById(userId);

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }
        const incomes = await Income.find({_id:{$in:userExists.incomes}});
        return res.status(200).json(incomes);
    }catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const updateIncome = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const incomeId = req.params.incomeId;

        // Validate that user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate that income exists and belongs to user
        const income = await Income.findOne({ _id: incomeId, _id: { $in: userExists.incomes } });
        if (!income) {
            return res.status(404).json({ message: 'Income not found or does not belong to user' });
        }

        // Update only provided fields
        const { title, description, amount, tag, currency } = req.body;
        if (title !== undefined) income.title = title;
        if (description !== undefined) income.description = description;
        if (amount !== undefined) income.amount = amount;
        if (tag !== undefined) income.tag = tag;
        if (currency !== undefined) income.currency = currency;

        await income.save();
        return res.status(200).json({ message: "Income updated successfully" });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const deleteIncome = async (req, res) => {
    try {
        const userId = userIdValidation.parse(req.params.userId);
        const incomeId = req.params.incomeId;

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if income exists and belongs to the user
        const incomeIndex = userExists.incomes.indexOf(incomeId);
        if (incomeIndex === -1) {
            return res.status(404).json({ message: 'Income not found or does not belong to user' });
        }

        // Remove income from user's income array and delete the income document
        userExists.incomes.splice(incomeIndex, 1);
        await userExists.save();
        await Income.findByIdAndDelete(incomeId);

        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addIncome, getIncomes, updateIncome, deleteIncome };