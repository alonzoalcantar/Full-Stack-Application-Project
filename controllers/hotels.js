module.exports = {
    new: newHotel,
};


function newHotel(req, res){
    res.render('hotels/new', {title: 'New Hotel'})
}