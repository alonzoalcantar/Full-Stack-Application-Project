const Room = require("../models/room");
const Hotel = require("../models/hotel");

module.exports = {
  new: newRoom,
  create,
  index,
  addRoom,
  delete: deleteRoom
};

function create(req, res) {
  const room = new Room(req.body);
  room.userRecommending = req.user._id;
  room.save(function (err) {
    if (err) return res.redirect("/rooms/new");
    console.log(room);
    res.redirect("/rooms");
  });
}

function newRoom(req, res) {
  res.render("rooms/new");
}

function index(req, res) {
  Room.find({}, function (err, rooms) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    res.render("rooms/index", { rooms });
  });
}

function addRoom(req, res) {
  Hotel.findById(req.params.id, function (err, hotel) {
    hotel.room.push(req.body.roomId);
    hotel.save(function (err) {
      res.redirect(`/hotels/${hotel._id}`);
    });
  });
}

function deleteRoom (req, res) {
    Room.findOne({"_id": req.params.id, userRecommending: req.user._id }).then(function(room){
        room.remove();
        res.redirect('/rooms')
    });
    
}