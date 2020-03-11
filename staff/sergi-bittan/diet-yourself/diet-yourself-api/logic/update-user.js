const { validate } = require("diet-yourself-utils")

module.exports = (id) => {
    validate.string(id, "id")


}
