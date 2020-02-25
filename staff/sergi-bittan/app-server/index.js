const express = require('express')
const { logger, loggerMidWare, /*wait*/ } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Register, Landing, Search, Results } = require('./components')
const FileStore = require('session-file-store')(session)
const { landing, login, loginPost, search, logout, registerPost, register, acceptCookies } = require("./routes")

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({
    secret: 'my grandmas dad had a second life',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}))

app.get('/', landing)

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.post('/logout', urlencodedBodyParser, logout)


app.post('/register', urlencodedBodyParser, registerPost)

app.get('/register', register)

app.post('/accept-cookies', acceptCookies)

app.get('/search', search)

app.post('/toggle-fav/:id', (req, res) => {
    const { params: { id }, session } = req

    debugger

    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id

        return session.save(() => res.redirect('/login'))
    }

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                // ?

                return
            }

            const { referer = req.get('referer') } = session

            delete session.referer
            delete session.fav

            session.save(() => res.redirect(referer))
        })
    } catch ({ message }) {
        // ?
    }
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})