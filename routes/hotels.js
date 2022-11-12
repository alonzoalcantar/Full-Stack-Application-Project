var express = require('express');
var router = express.Router();
var hotelsCtrl = require('../controllers/hotels');


//Private route Middleware

const isLoggedIn = require('../config/auth');

/* GET home page. */
router.get('/new',isLoggedIn, hotelsCtrl.new);

router.post('/', isLoggedIn, hotelsCtrl.create);

router.get('/', isLoggedIn, hotelsCtrl.index);


module.exports = router;