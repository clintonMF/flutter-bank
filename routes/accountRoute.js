const express = require('express');
const router = express.Router();

const { createAccount, getAccountByID, getAccounts } = require('../controllers/accountController');

router.route('/').get(getAccounts);
router.route('/').post(createAccount);
router.route('/:acctNum').get(getAccountByID);

module.exports = router;