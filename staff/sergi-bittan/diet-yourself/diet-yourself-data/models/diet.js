const mongoose = require('mongoose')
const { diet } = require('../schemas')

module.exports = mongoose.model('Diet', diet)