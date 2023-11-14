const mongoose =require('mongoose');

const PlaceSchema = new mongoose.Schema({
    owner :{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks:[String],
    extrainfo: String,
    checkin: Number,
    checkout: Number,
    maxguests: Number,
});

const PlaceModel = mongoose.model('place',PlaceSchema);

module.exports = PlaceModel;