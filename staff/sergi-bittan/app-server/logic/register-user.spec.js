const registerUser = require('./register-user')
const users = require('../data/users')

describe('register-user', function (){
    beforeEach(function () {
        users.length = 0;
    });
    it('should add one user with four properties', function() {
        registerUser('pepito', 'pep', 'pepi', '123')
        expect(users.length).toBe(1)
    })
    it('should fail on non string values as name parameters', function(){
        expect(function() {
            registerUser(false)
        }).toThrowError(TypeError, 'name false is not a string')
        expect(function() {
            registerUser(5)
        }).toThrowError(TypeError, 'name 5 is not a string')
        expect(function() {
            registerUser({})
        }).toThrowError(TypeError, 'name [object Object] is not a string')
        expect(function() {
            registerUser([])
        }).toThrowError(TypeError, 'name  is not a string')
        expect(function() {
            registerUser(function() {})
        }).toThrowError(TypeError, 'name function() {} is not a string')
    })
    afterEach(function() {
        users.length = 0;
    })
})