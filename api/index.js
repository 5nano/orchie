const express = require('express');
const apiMiddleware = require('./middlewares');
const session = require('express-session')

const app = express();

// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))
app.use(express.json());

app.use('/', apiMiddleware);
app.get('/ping', (req, res) => res.status(200).send('pong'))


module.exports = app;