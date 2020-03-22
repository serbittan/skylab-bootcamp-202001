const mongoose = require('mongoose')
const { food } = require('../schemas')

module.exports = mongoose.model('Food', food)