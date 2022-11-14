const Hotel = require("../models/hotel");
const Room = require("../models/room");

module.exports = {
  new: newHotel,
  create,
  index,
  show,
  delete: deleteHotel,
//   edit,
//   update
};

function newHotel(req, res) {
  res.render("hotels/new", { title: "New Hotel" });
}

function create(req, res) {
  const hotel = new Hotel(req.body);
  hotel.userRecommending = req.user._id;
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


function deleteHotel (req, res) {
    Hotel.findOne({"_id": req.params.id, userRecommending: req.user._id}).then(function(hotel){
        hotel.remove();
        res.redirect('/hotels')
    });
    
}

// function edit (req, res) {
//     const hotels = new Hotel(req.body);  
//     Hotel.find({'_id': req.params.id}).then(function (hotel){ 
//     res.render('hotels/edit', hotels, hotel)
// })
// }


// function update (req, res) {
//     Hotel.findOneAndUpdate({"_id":req.params.id}).then(function(hotel){
//     hotel.name = req.body.name
//     hotel.serviceSchedule= req.body.serviceSchedule
//     hotel.lengthOfStay = req.body.lengthOfStay
//     console.log(hotel)
//     hotel.save(function(err) {
//         if(err) return res.redirect('/hotels');
//         res.redirect(`/hotels/${hotel._id}`);
//     });
// })
// }