const express = require('express');
const router = require('./routes');
const connectDb = require('./lib/connect.js');

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(3000, () => {
    connectDb();
    console.log('Server is running on port 3000');
});