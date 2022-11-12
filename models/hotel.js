const mongoose = ('mongoose');

const Schema = mongoose.Schema;


const hotelSchema = new Schema({
    name: {type: String, enum: ['Marriott', 'Hyatt', 'Hilton', 'Wyndham']},
    serviceSchedule: {type: String, enum: ['Daily', 'Weekly', 'Upon Request', 'No Service']},
    lengthOfStay: Number
});



module.exports = mongoose.model('Hotel', hotelSchema);