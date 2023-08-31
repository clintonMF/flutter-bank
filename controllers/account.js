const {StatusCodes} = require('http-status-codes');

const database = require('../db/storage');
const {NotFound, BadRequest} = require('../utils/errors');
const generateNum = require('../utils/generate-num');
const validateInput = require('../utils/validation');

const createAccount = async (req, res) => {
    const { error, value } = validateInput(req.body);

    if (error) {
        throw new BadRequest(error.details[0].message);
    };

    const randomNum = generateNum(10);
    value.accountNumber = parseInt(randomNum);   // add account number
    database[database.length] = {...value};
    delete value.dob;  // don't return the DOB

    res.status(StatusCodes.CREATED).json(value);
};

const getAccountByID = async (req, res) => {
    let accountInfo;
    for (let i=0;i<database.length;i++) {
        if (parseInt(req.params['acctNum']) == database[i].accountNumber) {
            accountInfo = database[i];
            break;
        };
    };
    if (!accountInfo) {
        throw new NotFound(`Account ${req.params['acctNum']} not found`);
    };

    res.status(StatusCodes.OK).json(accountInfo);
};

const getAccounts = async (req, res) => {
    res.status(StatusCodes.OK).json(database);
};

module.exports = {
    createAccount,
    getAccountByID,
    getAccounts
};