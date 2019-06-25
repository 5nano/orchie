const express = require('express');
const apiMiddleware = require('./middlewares');
const app = express();

app.use(express.json());

app.use('/', apiMiddleware);
app.get('/ping', (req, res) => res.status(200).send('pong'))


module.exports = app;