const express = require ('express');
const createError = require('http-errors');
const cors = require('cors');

//* Utilities
const {ErrorHandler} = require('./handlers/ErrorHandler');
const {configs} = require('./configs');

//* Database & Models
const connectMongoDB = require('./models');

//* Routes
const userRoutes = require('./routes/user.routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/user', userRoutes)

app.use((req, res, next) => {
    next(new createError.NotFound());
});

app.use(ErrorHandler);

app.listen(configs.port, async() => {
    console.log(`Server started on port ${configs.port}`);
    await connectMongoDB();
});

//todo: We left off at the start of JWT authentication, creating routes for user. UDEMY
//? Git check