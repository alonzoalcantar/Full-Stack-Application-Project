var express = require("express");
var router = express.Router();
var hotelsCtrl = require("../controllers/hotels");
var roomsCtrl = require("../controllers/rooms");

//Private route Middleware

const isLoggedIn = require("../config/auth");

/* GET home page. */
router.get("/new", isLoggedIn, hotelsCtrl.new);

router.post("/", isLoggedIn, hotelsCtrl.create);

router.get("/", isLoggedIn, hotelsCtrl.index);

router.get("/:id", isLoggedIn, hotelsCtrl.show);

router.post("/:id/rooms", isLoggedIn, roomsCtrl.addRoom);

router.delete("/:id", isLoggedIn, hotelsCtrl.delete);

module.exports = router;
