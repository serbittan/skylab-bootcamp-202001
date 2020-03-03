const { Schema, Types: { ObjectId} } = require("mongoose")

module.exports = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: Date, require: true },
    location: { type: String, require: true },
    publisher: { type: ObjectId, required: true, ref: "User" },
    created: { type: Date, require: true, default: Date.now },
    subscribed: { type: [ObjectId], ref: "User" }
})