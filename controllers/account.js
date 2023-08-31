const {StatusCodes} = require('http-status-codes');

const {NotFound, BadRequest} = require('../utils/errors');
const database = require('../db/storage');
const generateNum = require('../utils/generate-num');
const validateInput = require('../utils/validation');

const createAccount = async (req, res) => {
    const { error } = validateInput(req.body);

    if (error) {
        throw new BadRequest(error.details[0].message)
    }

    const randomNum = generateNum(10)
    req.body.accountNumber = parseInt(randomNum);   // add account number
    database[database.length] = {...req.body}
    delete req.body.DOB  // don't return the DOB
    res.json({msg:"account created", details: req.body})
}

const getAccountByID = async (req, res) => {
    let accountInfo
    for (let i=0;i<database.length;i++) {
        if (parseInt(req.params['acctNum']) == database[i].accountNumber) {
            accountInfo = database[i]
            break
        }
    }
    if (!accountInfo) {
        throw new NotFound(`Account ${req.params['acctNum']} not found`);
    }

    res.status(StatusCodes.OK).json({accountInfo})
}

const getAccounts = async (req, res) => {
    res.json({accounts: database, number_of_accounts: database.length});
}

module.exports = {
    createAccount,
    getAccountByID,
    getAccounts
}