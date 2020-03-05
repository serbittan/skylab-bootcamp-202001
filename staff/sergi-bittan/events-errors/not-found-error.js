module.exports = class NotFoundError extends Error {
        constructor(...args) {     //(message, fileName, lineNumber) 
            super(...args)           // message, fileName, lineNumber)  

            this.name = NotFoundError.name
        }
}