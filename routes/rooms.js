var express = require('express');
var router = express.Router();
var roomsCtrl = require('../controllers/rooms');

router.get('/new', roomsCtrl.new);
router.post('/', roomsCtrl.create);
router.get('/', roomsCtrl.index);

module.exports = router;
