var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/api');


router.get('/', function(req, res) {
    res.json({ message: 'API up and running correctly!' });
});



app.user('/api', router);

app.listen(port);
console.log('Up and running on port ' + port);
