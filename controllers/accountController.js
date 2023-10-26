const {StatusCodes} = require('http-status-codes');


const { addAccount,
    getAccountByNUm,
    getAllAccounts } = require('../services/accountService');
const {NotFound, BadRequest} = require('../utils/errors');
const generateNum = require('../utils/generate-num');
const validateInput = require('../utils/validation');

const createAccount = async (req, res) => {
    const {error, value } = validateInput(req.body);
    if (error) {
        throw new BadRequest(error.details[0].message);
    };

    const accountNum = await generateNum();
    console.log(accountNum)
    // ensures uniqueness by searching the db
    while (await getAccountByNUm(accountNum) != null) {
        accountNum = await generateNum();
    }; 
    value.accountNumber = accountNum;   // add account number
    await addAccount(value) // create account number
    delete value.dob;  // don't return the DOB

    res.status(StatusCodes.CREATED).json(value);
};

const getAccountByID = async (req, res) => {
    const accountInfo = await getAccountByNUm(req.params['acctNum'])
    if (accountInfo == null) {
        throw new NotFound(`Account ${req.params['acctNum']} not found`);
    };

    res.status(StatusCodes.OK).json(accountInfo);
};

const getAccounts = async (req, res) => {
    const allAccounts = await getAllAccounts();
    res.status(StatusCodes.OK).json(allAccounts);
};

module.exports = {
    createAccount,
    getAccountByID,
    getAccounts
};