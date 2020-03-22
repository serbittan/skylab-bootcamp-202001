const { models: { Diet }} = require("diet-yourself-data")


module.exports =  () => {

    return (async () => {
        const diets = await Diet.find()
        
         return diets
    })()

}