const { Schema } = require("mongoose")

module.exports = new Schema({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    created: { type: Date, require: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    subscribeEvents: { type: [ObjectId]}
})