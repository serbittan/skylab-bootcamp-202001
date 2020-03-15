const { Schema } = require("mongoose")


module.exports = new Schema({
    method: { type: String},
    food: [ {
        description: { type: String},
        quantity: { typer: Number},
        points: { type: Number}
    } ]
     
})