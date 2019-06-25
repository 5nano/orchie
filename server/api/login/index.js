const express = require('express');
const app = express();

app.post('/login', (req, res) => {
    console.log(req.body);
});

module.exports = app;