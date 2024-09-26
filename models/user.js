const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            min: 6,
            max: 24,
        },
        incomes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Income',
            },
        ],
        expenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Expense',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)