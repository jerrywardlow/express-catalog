var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(morgan("short"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.MONGO_HOST + '/api');

var Duck = require('./app/models/ducks');

router.get('/', function(req, res) {
    res.json({ message: 'API up and running correctly!' });
});

router.route('/ducks')
    
    .post(function(req, res) {

        var duck = new Duck();
        duck.name = req.body.name;

        duck.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'Created new duck' });
        });
    })
    
    .get(function(req, res) {
        Duck.find(function(err, ducks) {
            if (err) res.send(err);

            res.json(ducks);
        });
    });


app.use('/api', router);

app.listen(port);
console.log('Up and running on port ' + port);
