const express = require('express');
const login = require('./login');
const QR = require('./qr');

const app = express();

app.use('/login', login);

app.use('/qr', QR)

module.exports = app;