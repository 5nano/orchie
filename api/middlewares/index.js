const express = require('express');
const login = require('./login');

const app = express();

app.use('/login', login);

module.exports = app;