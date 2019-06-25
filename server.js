
const templateDesktop = require('./templateDesktop');
const templateMobile = require('./templateMobile');
const express = require('express');
const config = require('./api/config');
const manifest = require('./dist/manifest');
const expressStaticGzip = require("express-static-gzip");
const helmet = require('helmet')
const useragent = require('useragent');
const MobileDetect = require('mobile-detect');

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
    const template = req.browser.mobile() ? templateMobile(title, manifest) : templateDesktop(title);
    res.send(template);
});

app.listen(config.port, () => console.log(`API running on port ${config.port}`));

module.exports = app;