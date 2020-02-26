const { fetch } = require('../utils')



module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      

        const data = JSON.parse(response.content), { error: _error } = data

        if (_error) throw new Error(_error)

        const { name, surname, username } = data

        return { name, surname, username }
    }) 
}