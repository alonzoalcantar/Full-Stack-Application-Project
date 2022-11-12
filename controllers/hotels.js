
const Hotel = require('../models/hotel');

module.exports = {
    new: newHotel,
    create,
    index
};


function newHotel(req, res){
    res.render('hotels/new', {title: 'New Hotel'})
};




function create(req, res) {
    const hotel = new Hotel(req.body);
    hotel.save(function(err) {
      // if we don't redirect, the new page will be shown
      // with /movies in the address bar
      if (err) return res.redirect('/hotels/new');
      console.log(hotel);
      // for now, redirect right back to new.ejs
      res.redirect('/hotels/');
    });
  };



function index(req, res) {
    Hotel.find({}, function(err, hotels){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.render('hotels/index', { hotels });
    });
}

  