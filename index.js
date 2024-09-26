const express = require('express');
const userRouter = require('./routes/user.js');

const connectDb = require('./lib/connect.js');

const app = express();

app.use(express.json());

app.use(userRouter);

console.log(process.env.DB_URL)

app.listen(3000, () => {
    connectDb();
    console.log('Server is running on port 3000');
});