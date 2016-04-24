var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('generic page about recent items');
});

router.get(':item_id', function(req, res) {
    res.send('generic info about item ' + req.params.item_id);
});
