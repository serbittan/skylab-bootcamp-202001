const { Schema, Types: { ObjectId } } = require('mongoose')
const  Diet  = require('./diet')



module.exports = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goal: { type: String, enum: ["gain muscle mass","maintain weight","lose weight"], require: true },
    activity: { type: String, enum: ["sedentary","mild activity","moderate activity", "heavy activity"], require: true },
    gender: { type: String, enum: ["male", "female"] },
    age: { type: Number, require: true },
    height: { type: Number, require: true },
    weight: { type: Number, require: true },
    city: { type: String },
    finalWeight: { type: Number },
    points: { type: Number },
    method: { type: String },
    diet: { type: String},
    favorites: { type: ObjectId,ref: "Diet"} 
})