const mongoose = require('mongoose')

const incomeSchema = new mongoose.SchemaTypeOptions({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
        trim: true,
        enum: ['salary', 'bonus', 'gift', 'other'],
    },
    currency: {
        type: String,
        required: true,
        default: 'ILS',
        enum: ['ILS', 'USD', 'EUR'],
    },
},
    { timestamps: true }
);

module.exports= mongoose.model('Income', incomeSchema);