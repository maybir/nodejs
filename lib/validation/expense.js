const { z } = require('zod');

// Define the validation schema for expense data
const expenseSchema = z.object({
    title: z.string(),                               // Title is required and should be a string
    description: z.string().optional(),              // Description is optional and should be a string if provided
    amount: z.number().positive(),                   // Amount is required and must be a positive number
    tag: z.enum(['food', 'rent', 'transport', 'clothing', 'entertainment', 'health', 'education', 'other']), // Tag must be one of the specified categories
    currency: z.enum(['ILS', 'USD', 'EUR']),         // Currency must be one of the specified values
});

module.exports = { expenseSchema };
