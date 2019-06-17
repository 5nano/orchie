const express = require('express');
const path = require('path');
const app = express();

app.listen(8080);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, `../build/${req.path}`));
});

module.exports = app;