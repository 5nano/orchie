
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const templateFn = require('./template');
const express = require('express');
const config = require('./api/config');
const manifest = require('./dist/manifest');
const useragent = require('express-useragent');
const expressStaticGzip = require("express-static-gzip");
var helmet = require('helmet')

const Api = require('./api');

const app = express();

app.use(helmet())

app.use('/api', Api);

app.use("/dist", expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.get('/', (req, res, next) => {
    const template = templateFn('A random project', manifest);
    res.send(template);
});

app.listen(config.port, () => console.log(`API running on port ${config.port}`));

module.exports = app;