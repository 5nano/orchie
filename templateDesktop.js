const React = require('react');

module.exports = (title) => {     
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>${title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2" as="font">
        <link rel="preload" href="https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2" as="font">
    </head>
    <body>
        <h2>Accedé desde un dispositivo móvil para usar esta app</h2>
    </body>
    </html>
`};
