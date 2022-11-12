var express = require('express');
var router = express.Router();
var hotelsCtrl = require('../controllers/hotels');


//Private route Middleware

const isLoggedIn = require('../config/auth');

/* GET home page. */
router.get('/new',isLoggedIn, hotelsCtrl.new);


module.exports = router;