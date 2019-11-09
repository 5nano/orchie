
const templateMobile = require('./templateMobile');
const express = require('express');
const config = require('./config');
const manifest = require('./dist/manifest');
const expressStaticGzip = require("express-static-gzip");
const helmet = require('helmet')
const useragent = require('useragent');
const MobileDetect = require('mobile-detect');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path=require('path');

const privateKey  = fs.readFileSync('cert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('cert/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const Api = require('./api');
const devMode = process.env.NODE_ENV === 'development';
const app = express();

app.use(helmet());
app.use((req, res, next) => {
    const mobileDetect = new MobileDetect(req.headers['user-agent']);
    req.browser = Object.assign(mobileDetect, useragent.parse(req.headers['user-agent']));
    next();
});

app.use('/api', Api);

app.use("/dist", expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ['br']
}));

app.use('/', (req, res) => {
    const title = 'Orchie'
    const template = templateMobile(title, manifest)
    res.send(template);
});

app.use(express.static(path.join(__dirname,'/src/assets')))


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || config.port.http);
httpsServer.listen(config.port.https); // process.env.PORT is provided by heroku

console.log(`http serving on ${config.port.http}\n`);
console.log(`https serving on ${config.port.https}\n`)

module.exports = app;