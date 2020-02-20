if (typeof require !== "undefined"){
    var authenticate = require("./authenticate")
    var users = require("../utils/data")
}
describe("Authenticate Test", function(){
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
                authenticate(user.username, user.password)
            }).not.toThrow(Error);
        })
        it("should fail on incorrect credentials", function(){
            expect(function(){
                authenticate(user.username + "-wrong", user.password)
            }).toThrowError(Error, "wrong credentials");
            expect(function(){
                authenticate(user.username, user.password + "-wrong")
            }).toThrowError(Error, "wrong credentials");
        })
        
    })
    
    it("Should fail on non exist user", function(){
        expect(function(){
            authenticate(user.username, user.password)
        }).toThrowError(Error, "wrong credentials")
    })

    it("Should fail on non string arguments", function(){
        expect(function(){
            authenticate(undefined, user.password)
        }).toThrowError(TypeError, "undefined is not a string");
        expect(function(){
            authenticate(user.name, undefined)
        }).toThrowError(TypeError, "undefined is not a string");
    })

    afterEach(function(){
        users.length = 0;
    });

});
