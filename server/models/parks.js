let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let parkSchema = new Schema({
    "parkName": String,
    "parkPrice": Number,
    "parkStatus": Number
});

module.exports = mongoose.model('Park', parkSchema);
