const database = require('../db/storage');

const getAllAccounts = async () => {
    return database
};

const getAccountByNUm = async (acctNum) => {
    for (let i=0;i<database.length;i++) {
        if (acctNum == database[i].accountNumber) {
            return database[i];

        };
    };

    return null
};

const addAccount = async (value) => {
    database[database.length] = {...value};
}

module.exports = {
    addAccount,
    getAccountByNUm,
    getAllAccounts
};