// require("dotenv").config()

// const { expect } = require("chai")
// const { random, floor } = Math
// const { mongoose, models: { User } } = require("diet-yourself-data")
// const updateUser = require("./update-user")

// const { env: { TEST_MONGODB_URL } } = process

// describe("updateUser", () => {
//     let id
//     let updates = {
//         goal : ["gain muscle mass","maintain weight","lose weight"],
//         activity :["sedentary","mild activity","moderate activity", "heavy activity"],
//         gender : ["male", "female"],
//         city: ["barcelona", "madrid", "sevilla"],
//         age: [ 45,34,32,26,37],
//         height: [157,180,178,168],
//         weight: [75,80,90,65]
//     }
    
//     //goal = ["gain muscle mass","maintain weight","lose weight"]
//     goalIndex = Math.floor(Math.random() * 3)
//     //activity = ["sedentary","mild activity","moderate activity", "heavy activity"]
//     activityIndex = Math.floor(Math.random() * 4)
//     //gender = ["male", "female"]
//     genderIndex = Math.floor(Math.random() * 2)
//     //city = ["barcelona", "madrid", "sevilla"]
//     cityIndex = Math.floor(Math.random() * 3)

//     // gender = ["male", "female"]
//     // genderIndex = Math.floor(Math.random() * 2)

//     before(() => 
//         mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//             .then(() => User.deleteMany())
//     )

   
//     beforeEach(() => {
//         debugger
//         id = `id-${random()}`
//         goal = goal[goalIndex]
//         activity = activity[activityIndex]
//         city = `city-${random()}`
//         age = (floor(random() * 65) + 12)
//         height = (floor(random() * 200) + 120)
//         weight = (floor(random() * 200) + 30)
//         finalWeight = (floor(random() * 200) + 30)
//     });
//      debugger
//      it("should succeed on correct user data", () => 
//         updateUser(id, updates)
//             .then(user => {
//                 debugger
//                 expect(user).to.exist
//                 expect(user.username).to.be.a("string")
//                 expect(user.username).to.equal(username)
//                 expect(user.mail).to.equal(email)
//                 expect(user.goal).to.equal(goal)
//                 expect(user.activity).to.equal(activity)
//                 expect(user.gender).to.equal(gender)
//                 expect(user.age).to.equal(age)
//                 expect(user.height).to.equal(height)
//                 expect(user.weight).to.equal(weight)
//                 expect(user.city).to.equal(city)


//                 return User.findById
//             }))
// })