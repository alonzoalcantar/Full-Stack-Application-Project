var Hotel = require("../models/hotel");

module.exports = {
  create,
  delete: deleteReview
};

function create(req, res) {
  Hotel.findById(req.params.id, function (err, hotel) {
    hotel.reviews.push(req.body);
    hotel.save(function (err) {
      res.redirect(`/hotels/${hotel._id}`);
    });
  });
}


function deleteReview (req, res) {
    Hotel.findOne({"_id": req.params.id}).then(function(hotel){
        hotel.remove();
        res.redirect(`/hotels/${hotel._id}`)
    });
}