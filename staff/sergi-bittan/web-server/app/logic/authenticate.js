if(typeof require !== "undefined"){
    var users = require("../utils/data")
}

function authenticate(username, password){
    if (typeof username !== "string")throw new TypeError(username + " is not a string");
    if (typeof password !== "string")throw new TypeError(password + " is not a string");

    var user = users.find(user => { username === user.username})
    
        if(user && user.password === password){
            return true;
        }else{
            throw new Error("wrong credentials")
        }
     
}

if (typeof module !== "undefined"){
    module.exports = authenticate
}