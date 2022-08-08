const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const env = require('./env.js');
const mongoConnection = env.mongoConnection;
const port = env.port;

//connect to the database
mongoose.connect(mongoConnection, {
    useNewUrlParser: true
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));