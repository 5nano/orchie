
const templateDesktop = require('./templateDesktop');
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
var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

firebase.initializeApp({
    apiKey: "AIzaSyBLbSF0bTZ4dA8kKEKybENZxWZuMWPfzE4",
    authDomain: "proyecto-final-utn-frba.firebaseapp.com",
    databaseURL: "https://proyecto-final-utn-frba.firebaseio.com",
    projectId: "proyecto-final-utn-frba",
    storageBucket: "",
    messagingSenderId: "699033970836",
    appId: "1:699033970836:web:f97c03cf9f16c463"
})

const privateKey  = fs.readFileSync('cert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('cert/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const Api = require('./api');

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
    const template = req.browser.mobile() ? templateMobile(title, manifest) : templateDesktop(title, manifest);
    res.send(template);
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || config.port.http);
httpsServer.listen(config.port.https); // process.env.PORT is provided by heroku

console.log(`http serving on ${config.port.http}\n`);
console.log(`https serving on ${config.port.https}\n`)

module.exports = app;