require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const acctRouter = require('./routes/account');
const notFoundMidllware = require('./middleware/not-found');
const errorMidllware = require('./middleware/error-handler');

app.use(express.json());
app.get('/', (req, res) => {
  const randomBytes = crypto.randomBytes(Math.ceil(10 / 2));
    const id = randomBytes.toString('hex').slice(0, 10);
    res.json({"msg": "app is running", id});
  });
  
app.use('/api/v1/accounts', acctRouter)
const database = []

app.use(notFoundMidllware);
app.use(errorMidllware);

const PORT = process.env.PORT|| 3000;

module.exports = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});