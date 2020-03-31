const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createDiet,
    retrieveDiet,
    retrieveUserDiet,
    retrieveDiets,
    addFavDiet,
    removeFavDiet
   
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch("/users", jwtVerifierMidWare, jsonBodyParser, updateUser)

router.post("/user/diet", jwtVerifierMidWare, jsonBodyParser, createDiet)

//retrieve de la dieta con el idDiet
router.get("/user/diet/:idDiet", jwtVerifierMidWare,  retrieveDiet)

//retrieve de la dieta actual del user

router.get("/user/diet", jwtVerifierMidWare,  retrieveUserDiet)

//retrieve de las dietas de favs

router.get("/user/diets", jwtVerifierMidWare, retrieveDiets)

router.patch("/user/favs", jwtVerifierMidWare, addFavDiet)

router.patch("/user/diet/:idDiet/delete", jwtVerifierMidWare, removeFavDiet )




module.exports = router