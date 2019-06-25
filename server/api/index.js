const express = require('express');
const loginMiddleware = require('./login');
const app = express();

app.use('/login', loginMiddleware);

module.exports = app;