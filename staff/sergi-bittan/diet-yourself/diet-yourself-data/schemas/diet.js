const { Schema } = require("mongoose")


module.exports = new Schema({
    method: { type: String},
    proportions: [ {
        food: String,
        quantity: Number
    } ],
    points: { type: Number }  
})