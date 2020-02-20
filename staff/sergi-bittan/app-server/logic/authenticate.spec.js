const authenticateUser = require("./authenticateUser-user")
const users = require("../data/users")

describe("authenticate-user Test", function(){
    var user;
    beforeEach(function(){
        users.length = 0;

        user = {
            name: "name" + Math.random(),
            surname: "surname" + Math.random(),
            username: "username" + Math.random(),
            password: "password" + Math.random()
        }
    });
    describe("When user already exist", function(){
        beforeEach(function(){
            users.push(user);
        });

        it("should succed on correct credentials", function(){
            expect(function(){
                authenticateUser(user.username, user.password)
            }).not.toThrow(Error);
        })
        it("should fail on incorrect credentials", function(){
            expect(function(){
                authenticateUser(user.username + "-wrong", user.password)
            }).toThrowError(Error, "wrong credentials");
            expect(function(){
                authenticateUser(user.username, user.password + "-wrong")
            }).toThrowError(Error, "wrong credentials");
        })
        
    })
    
    it("Should fail on non exist user", function(){
        expect(function(){
            authenticateUser(user.username, user.password)
        }).toThrowError(Error, "wrong credentials")
    })

    it("Should fail on non string arguments", function(){
        expect(function(){
            authenticateUser(undefined, user.password)
        }).toThrowError(TypeError, "undefined is not a string");
        expect(function(){
            authenticateUser(user.name, undefined)
        }).toThrowError(TypeError, "undefined is not a string");
    })

    afterEach(function(){
        users.length = 0;
    });

});
