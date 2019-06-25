const express = require('express');
const path = require('path');
const apiMiddleware = require('./api');
const app = express();

app.listen(3000);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use('/api', apiMiddleware);

app.use('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, `../build/${req.path}`));
});

module.exports = app;