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

router.route('/ducks/:duck_id')

    .get(function(req, res) {
        Duck.findById(req.params.duck_id, function(err, duck) {
            if (err) res.send(err);
            res.json(duck);
        });
    })

    .put(function(req, res) {
        Duck.findById(req.params.duck_id, function(err, duck) {
            if (err) res.send(err);
            
            duck.name = req.body.name;

            duck.save(function(err) {
                if (err) res.send(err);
                res.json({ message: "Duck updated" });
            });
        });
    })

    .delete(function(req, res) {
        Duck.remove({
            _id: req.params.duck_id
        }, function(err, duck) {
            if (err) res.send(err);
            res.json({ message: "Duck... terminated." });
        });
    });


app.use('/api', router);

app.listen(port);
console.log('Up and running on port ' + port);
