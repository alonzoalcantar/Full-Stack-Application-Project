const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const hotelSchema = new mongoose.Schema({
    name: {type: String, enum: ['Marriott', 'Hyatt', 'Hilton', 'Wyndham']},
    serviceSchedule: {type: String, enum: ['Daily', 'Weekly', 'Upon Request', 'No Service']},
    lengthOfStay: Number
},{
    timestamps: true
 });



module.exports = mongoose.model('Hotel', hotelSchema);