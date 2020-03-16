const { Schema } = require("mongoose")


module.exports = new Schema({
    method: { type: String},
    food: [ {
        description: { type: String},
        quantity: { type: String},
        points: { type: Number}
    } ]
     
})