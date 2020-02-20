
 const users = require("../utils/data")


function retrieveUser(username) {
    if (typeof username !== "string")throw new TypeError(username + " is not a string");
    

    var user = users.find(user => { username === user.username})
    
        if(user && user.password === password){
            return true;
        }else{
            throw new Error("wrong credentials")
        }
     
}


    module.exports = retrieveUser

