module.exports = function(app) {
    var index = require('../controllers/index.app.controller');
    app.get('/', index.render);
};
