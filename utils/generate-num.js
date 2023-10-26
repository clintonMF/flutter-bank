// generate unique number of digits
function generateBankAccNum() {
    // Your bank code (you can replace this with your actual bank code)
    const bankCode = '123';
  
    // Generate a random 6-digit number
    const min = 1000000;
    const max = 9999999;
    const randomAccountNumber = String(Math.floor(Math.random() * (max - min + 1)) + min);
  
    const accountNumber = `${bankCode}-${randomAccountNumber}`;
  
    return accountNumber;
}

module.exports = generateBankAccNum;