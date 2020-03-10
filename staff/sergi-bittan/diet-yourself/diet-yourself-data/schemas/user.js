const { Schema } = require('mongoose')
const { Diet } = require('./diet')

module.exports = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, require: true },
    weight: { type: Number, require: true },
    height: { type: Number, require: true },
    gender: { type: String, enum: ["male", "female"] },
    activity: { type: String, require: true },
    points: { type: Number },
    method: { type: String },
    //diet: Diet,
    //favorites: [Diet] 
})