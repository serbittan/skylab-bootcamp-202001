const { Schema, Types: { ObjectId } } = require('mongoose')
const diet = require('./diet')
const { goals, activities } = require('../../diet-yourself-utils/constants')

module.exports = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    goal: {
        type: String,
        enum: goals,
        require: true
    },
    activity: {
        type: String,
        enum: activities,
        require: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    age: {
        type: Number,
        require: true
    },
    height: {
        type: Number,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    city: { type: String },
    finalWeight: { type: Number },
    points: { type: Number },
    diet: diet,
    favorites: [diet]
})