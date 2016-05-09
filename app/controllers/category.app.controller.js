exports.renderAll = function(req, res) {
    res.render('categories', {
        title: 'categories',
        message: 'list of all the categories'
    });
};
