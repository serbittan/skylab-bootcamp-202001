require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('diet-yourself-data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const bcrypt = require('bcryptjs')
const { ContentError } = require("diet-yourself-errors")


describe("retrieveDiet", () => {
    Before(() =>
    mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
    )
})