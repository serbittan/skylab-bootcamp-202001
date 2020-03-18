const { Schema } = require("mongoose")
const food = require('./food')
const { methods } = require('../constants')

module.exports = new Schema({
    method: {
        type: String,
        required: true,
        enum: methods.map(method => method.name)
    },
    foods: [{
        type: food,
        required: true
    }],
    points: {
        type: Number,
        required: true
    }
})