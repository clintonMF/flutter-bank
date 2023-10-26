const Joi = require('joi');

// Define account types as an enum
const accountTypes = ['Savings', 'Checking', 'Credit'];

const validateInput = (userInput) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(2).required(),
        lastName: Joi.string().trim().min(2).required(),
        accountBalance: Joi.number().min(0).required(),
        dob: Joi.date().max('01-01-2005').iso().messages({
            'date.format': `Date format is YYYY-MM-DD`,
            'date.max':`Age must be 18+`}).required(),
        accountType: Joi.string().trim().valid(...accountTypes).required()
        .insensitive()
    });

    return schema.validate(userInput);
};

module.exports = validateInput;