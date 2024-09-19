const express = require('express');
const userRouter = require('./routes/user.js');

const app = express();

app.use(express.json());

app.use(userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
