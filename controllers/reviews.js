var Hotel = require("../models/hotel");

module.exports = {
  create,
};

function create(req, res) {
  Hotel.findById(req.params.id, function (err, hotel) {
    hotel.reviews.push(req.body);
    hotel.save(function (err) {
      res.redirect(`/hotels/${hotel._id}`);
    });
  });
}

