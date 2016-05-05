var express = require('express');

module.exports = function() {
    var app = express();

    app.set('views', __dirname + '/../app/views');
    app.set('view engine', 'pug');

    require('../app/routes/index.app.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
