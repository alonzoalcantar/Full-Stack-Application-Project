const Hotel = require("../models/hotel");
const Room = require("../models/room");

module.exports = {
  new: newHotel,
  create,
  index,
  show,
};

function newHotel(req, res) {
  res.render("hotels/new", { title: "New Hotel" });
}

function create(req, res) {
  const hotel = new Hotel(req.body);
  hotel.save(function (err) {
    if (err) return res.redirect("/hotels/new");
    console.log(hotel);
    res.redirect(`/hotels/${hotel._id}`);
  });
}

function index(req, res) {
  Hotel.find({}, function (err, hotels) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    res.render("hotels/index", { hotels });
  });
}

function show(req, res) {
  Hotel.findById(req.params.id)
    .populate("room")
    .exec(function (err, hotel) {
      Room.find({ _id: { $nin: hotel.room } }, function (err, rooms) {
        console.log(rooms);
        res.render("hotels/show", {
          title: "Hotel Detail",
          hotel,
          rooms,
        });
      });
    });
}
