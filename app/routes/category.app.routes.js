module.exports = function(app) {
    var category = require('../controllers/category.app.controller');

    app.get('/categories', category.renderAll);

    //  app.get('/category/:categoryId', category.categoryById);
};
