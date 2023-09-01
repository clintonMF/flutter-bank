const crypto = require('crypto');

// generate unique number of digits
const generateNum = (len) => {
    const randomBytes = crypto.randomBytes(Math.ceil(len / 2));
    const randomNUm = randomBytes.reduce((acc, byte) => {
        return acc + byte.toString().padStart(2, '0');}, '').slice(0, len);


    return randomNUm;
};

module.exports = generateNum;