var express = require("express");
var router = express.Router();
var roomsCtrl = require("../controllers/rooms");

const isLoggedIn = require("../config/auth");

router.get("/new", isLoggedIn, roomsCtrl.new);
router.post("/", isLoggedIn, roomsCtrl.create);
router.get("/", isLoggedIn, roomsCtrl.index);
router.delete("/:id", isLoggedIn, roomsCtrl.delete);

module.exports = router;
