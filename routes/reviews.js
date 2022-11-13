var express = require("express");
var router = express.Router();
var reviewsCtrl = require("../controllers/reviews");

const isLoggedIn = require("../config/auth");

router.post("/hotels/:id/reviews", isLoggedIn, reviewsCtrl.create);
router.delete("/hotels/:id", isLoggedIn, reviewsCtrl.delete);

module.exports = router;
