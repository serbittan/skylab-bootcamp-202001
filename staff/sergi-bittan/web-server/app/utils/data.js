var users = []; // ej:user => {name,surname,username,password}

users.push({name: "Pepito", surname: "Grillo", username: "pepigri", password: "123"});

if (typeof module !== "undefined"){
    module.exports = users
}