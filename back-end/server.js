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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const projects = require('./projects.js');
const users = require('./users.js');
const experience = require('./experience.js');
const hobbies = require('./hobbies.js');

app.use('/api/projects', projects.routes);
app.use('/api/users', users.routes);
app.use('/api/experience', experience.routes);
app.use('/api/hobbies', hobbies.routes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));