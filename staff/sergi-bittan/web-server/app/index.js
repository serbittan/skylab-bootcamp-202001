const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require("./logic/authenticate")
const register = require("./logic/register")
const users = require("./utils/data")
// const staticMidWare = require('./utils/static-mid-ware')

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

//logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

//app.use(staticMidWare(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.post("/autenthicate", (req, res, next)=>{
    let data = "" // creo string para recuperar chunk
    req.on("data", chunk => {
        data += chunk
    })
    req.on("end", ()=> {
        //do un console.log o debug me muestra lo que recibo de chunk para asi crear mi obj
        let body = {}
        data.split("&").forEach(element => {
            const key = element.split("=")[0]
            const value = element.split("=")[1]
            body[key] = value
        })
        req.body = body  //creo la propiedad body en req.y me asigno el body que recibo
        next()
    })
},(req,res) => {
    try{
        //tenemos que autentificar la logica de authenticate
        const {body: {username, password}} = req
        authenticate(username, password)
        //llamamos a retrieve para recuperar el usuario y pintarlo
        retrieveUser(username)
        //const rs = fs.createReadStream(path.join(__dirname, 'public/index.html')) si lo quiero meter en index.html
            res.send(`<h1>Hello ${username} </h1>`)
        res.end()
    }catch(error){
        const rs = fs.createReadStream(path.join(__dirname, 'public/login-wrong.html'))
        rs.on('open', function () {
                rs.pipe(res);
        })
    }
})

app.post("/register", (req, res, next) =>{
    let dataRegister = ""
    req.on("data", chunk =>{
        dataRegister += chunk
    })
    req.on("end", (req, res)=>{
        let body = {}

        body = dataRegister.split('&').reduce((accum, keyValue) => {
            const [key, value] = decodeURI(keyValue).split('=')
            
            accum[key] = value
            
            return accum
        }, {})
        debugger
        req.body = body
        
    })
    next()
}, (req, res)=>{
    try{
        const {body: {name, surname, username, password}} = req
        register(name, surname, username, password)
        const rs = fs.createReadStream(path.join(__dirname, 'public/login.html'))
        rs.send(res)
    }catch(error){
        const rs = fs.createReadStream(path.join(__dirname, 'public/register-wrong.html'))
        rs.on('open', function () {
                rs.pipe(res);
        })
    }
    res.end()
})



app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})