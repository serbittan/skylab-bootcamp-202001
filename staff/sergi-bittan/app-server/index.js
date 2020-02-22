const express = require('express')
const { logger, loggerMidWare, cookieParserMidWare } = require("./utils")
const path = require("path")
const { authenticateUser, registerUser, retrieveUser } = require("./logic")
const bodyParser = require("body-parser")
const { Login, App, Home, Landing, Register } = require("./components")
const { sessions } = require("./data")

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(cookieParserMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.send(App({ title: "My App", body: Landing() }))
})

app.get("/login", (req, res) => {
    const { cookies: { username } } = req
    
    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    res.send(App({ title: "Login", body: Login() }))
})

app.use(urlencodedBodyParser)

app.post("/login", (req, res) => {
    const { username, password } = req.body  //req lleva mas cosas masticadas.Necesitamos el body con los inputs del form

    try {
        authenticateUser(username, password)
        sessions.push(username)

        const { cookies: { username: _username }} = req

        username !== _username && res.setHeader("set-cookie", `username=${username}`)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        res.send(App({ title: "Login", body: Login({ error: message })}))
    }
})

app.get("/home/:username", (req, res) => {
    const { params: {username} } = req

    if (sessions.includes(username)) {
        const { name } = retrieveUser(username)
        const { cookies: { username: _username}} = req

        username !== _username && res.setHeader("set-cookie", `username=${username}`)

        res.send(App({ title: "Home", body: Home({ name, username })}))

    } else res.redirect("/login")
})

app.post("/logout", (req, res) => {
    const { body: { username }} = req

    const index = sessions.indexOf(username)
    sessions.splice(index, 1)

    res.clearCookie("username")
    res.redirect("/login")
})

app.post("/register", (req, res) => {
    const { name, surname, username, password } = req.body
    try{
        registerUser(name, surname, username, password)

        res.redirect("/login")
    } catch ({ message }) {
        res.send(App({ title: "Register" , body: Register({ error: message }) }))
    }
})

app.get("/register", (req, res) => {
    res.send(App({ title: "Register", body: Register()}))
})

app.listen(port, ()=> logger.info(`server up running on port ${port}`))

process.on("SIGINT", () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})






//     let data = "" // creo string para recuperar chunk
//     req.on("data", chunk => {
//         data += chunk
//     })
//     req.on("end", ()=> {
//         //do un console.log o debug me muestra lo que recibo de chunk para asi crear mi obj
//         let body = {}
//         data.split("&").forEach(element => {
//             const key = element.split("=")[0]
//             const value = element.split("=")[1]
//             body[key] = value
//         })
//         req.body = body  //creo la propiedad body en req.y me asigno el body que recibo
//         next()
//     })
// },(req,res) => {




    
//     try{
//         //tenemos que autentificar la logica de authenticate
//         const {body: {username, password}} = req
//         authenticate(username, password)
//         //llamamos a retrieve para recuperar el usuario y pintarlo
//         retrieveUser(username)
//         //const rs = fs.createReadStream(path.join(__dirname, 'public/index.html')) si lo quiero meter en index.html
//             res.send(`<h1>Hello ${username} </h1>`)
//         res.end()
//     }catch(error){
//         const rs = fs.createReadStream(path.join(__dirname, 'public/login-wrong.html'))
//         rs.on('open', function () {
//                 rs.pipe(res);
//         })
//     }
// })

// app.post("/register", (req, res, next) =>{
//     let dataRegister = ""
//     req.on("data", chunk =>{
//         dataRegister += chunk
//     })
//     req.on("end", (req, res)=>{
//         let body = {}

//         body = dataRegister.split('&').reduce((accum, keyValue) => {
//             const [key, value] = decodeURI(keyValue).split('=')
            
//             accum[key] = value
            
//             return accum
//         }, {})
//         debugger
//         req.body = body
        
//     })
//     next()
// }, (req, res)=>{
//     try{
//         const {body: {name, surname, username, password}} = req
//         register(name, surname, username, password)
//         const rs = fs.createReadStream(path.join(__dirname, 'public/login.html'))
//         rs.send(res)
//     }catch(error){
//         const rs = fs.createReadStream(path.join(__dirname, 'public/register-wrong.html'))
//         rs.on('open', function () {
//                 rs.pipe(res);
//         })
//     }
//     res.end()
// })



// app.listen(port, () => logger.info(`server up and running on port ${port}`))

// process.on('SIGINT', () => {
//     logger.warn(`server abruptly stopped`)

//     process.exit(0)
// })