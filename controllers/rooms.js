const Room = require("../models/room");
const Hotel = require("../models/hotel");
const room = require("../models/room");

module.exports = {
  new: newRoom,
  create,
  index,
  addRoom,
  delete: deleteRoom,
  edit,
  update,
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
    room.userRecommending = req.user._id;
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


function edit (req, res) {
    Room.find({'_id': req.params.id, userRecommending: req.user._id }).then(function (room){
    res.render('rooms/edit', room)
})
}


function update (req, res) {
    room.userRecommending = req.user._id;
    Room.findOneAndUpdate({"_id":req.params.id, userRecommending: req.user._id }).then(function(room){
    room.bedsize = req.body.bedsize
    room.roompackage = req.body.roompackage
    room.smoking = req.body.smoking
    console.log(room)
    room.save(function(err) {
        if(err) return res.redirect('/rooms');
        res.redirect('/rooms')
    });
})
}

