const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createDiet,
    retrieveDiet,
    retrieveDiets,
    updateUserDiet,
    randomFoods
   
} = require('./handlers')
const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch("/users", jwtVerifierMidWare, jsonBodyParser, updateUser)

router.patch("/user/:userId/:dietId",jsonBodyParser, updateUserDiet)

router.post("/user/diet", jsonBodyParser, createDiet)

router.get("/diet", retrieveDiet)

router.get("/diets", retrieveDiets)

router.post("/diet/random", jsonBodyParser, randomFoods)


module.exports = router