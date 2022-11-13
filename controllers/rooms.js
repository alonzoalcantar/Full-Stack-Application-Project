const Room = require("../models/room");
const Hotel = require("../models/hotel");

module.exports = {
  new: newRoom,
  create,
  index,
  addRoom
};

function create(req, res) {
  const room = new Room(req.body);
  room.save(function (err) {
    // if we don't redirect, the new page will be shown
    // with /movies in the address bar
    if (err) return res.redirect("/rooms/new");
    console.log(room);
    // for now, redirect right back to new.ejs
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
    Hotel.findById(req.params.id, function(err, hotel) {
      hotel.room.push(req.body.roomId);
      hotel.save(function(err) {
        res.redirect(`/hotels/${hotel._id}`);
      });
    });
  }