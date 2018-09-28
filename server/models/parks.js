let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let parkSchema = new Schema({
    "parkId": String,
    "parkName": String,
    "parkPrice": Number,
    "parkStatus": Number
});

module.exports = mongoose.model('Park', parkSchema);
