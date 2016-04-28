var express = require('express');

module.exports = function() {
    var app = express();

    app.set('views', './app/views');
    app.set('view engine', 'pug')

    require('../app/routes/index.app.routes.js')(app);
    return app;
};
