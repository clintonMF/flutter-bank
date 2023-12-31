require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const express = require('express');
const app = express();

const acctRouter = require('./routes/accountRoute');
const notFoundMidllware = require('./middleware/not-found');
const errorMidllware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors());
app.use(helmet());

// for running basic deployment test
app.get('/', (req, res) => {
    res.json({"msg": "app is running"});
});
// account router
app.use('/api/v1/accounts', acctRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundMidllware);
app.use(errorMidllware);

const PORT = process.env.PORT|| 3000;

module.exports = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});