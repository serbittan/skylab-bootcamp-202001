const users = require("../data/users")


module.exports = function (username, password){
    if (typeof username !== "string")throw new TypeError(username + " is not a string");
    if (typeof password !== "string")throw new TypeError(password + " is not a string");

    const user = users.find(user => { username === user.username})
    
        if(user && user.password === password){
            return true;
        }else{
            throw new Error("wrong credentials")
        }
     
}


    
