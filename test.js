const Joi = require('joi');

// Define account types as an enum
const accountTypes = ['Savings', 'Checking', 'Credit'];

// Joi schema for validation
const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    accountBalance: Joi.number().min(0).required(),
    dob: Joi.date().max('01-01-2005').iso().messages({
        'date.format': `Date format is YYYY-MM-DD`,
        'date.max':`Age must be 18+`}).required(),
    accountType: Joi.string().valid(...accountTypes).required().insensitive()
})
// User input data
const userInput = {
  firstName: 'J',
  lastName: 'D',
  accountBalance: 1000,
  dob: '2002-11-11',
  accountType: 'savings'
};

// Validate user input against the schema

const validateInput = (userInput) => {
    const { error, value } = schema.validate(userInput);
    // if (error) {
    //   console.error('Validation error:', error.details);
    // } else {
    //   console.log('Validated data:', value);
    // }

    if (error) {
        console.error('Validation errors:', error.details[0].message);
    } else {
    console.log('Validation successful', value);
    }

}

validateInput(userInput)

