const http = require('http')
const logger = require("./logger")
const fs = require("fs")

const {argv: [, , port = 8080]} = process

const requestListener = (req, res) =>{
     logger.info(`request from ${req.socket.remoteAddress}: ${req.url}`)

    const main = "/index.html"

    const rs = fs.createReadStream(`.${req.url === "/" ? main: req.url}`)

    if (req.url !== "favicon.ico"){
        rs.on("data", body => {
            res.end(body)
        })

        rs.on("error", error => {
            logger.warn(error)
            res.writeHead(404)
            res.end("<h1>NOT FOUND<h1>")
        })
    }else {
        logger.warn(error)
        res.writeHead(404)
        res.eng("<h1>NOT FOUND</h1>")
    }
}
logger.info("starting server")

const server = http.createServer(requestListener)

server.listen(port,()=> {
    logger.info(`server running on port ${port}`)

})

server.on("SIGINT", ()=>{
    logger.warn("server stopped abruptly")

    setTimeout(()=> process.exit(0), 1000)

})


//lo mismo que lo de arriba pero mas sencillo (Mónica)

// const http = require ("http")
// const fs = require ("fs")
// const logger = require ("./logger")

// const requestListener = (req, resp)=> {
//     const rs = fs.createReadStream(`.${req.url === "/" ? "index.html" : req.url}`)
//     console.log(req)
//     rs.on("data", content => {
//         resp.writeHead(200)
//         resp.end(`${content}`)
//     })
// }

// const server = http.createServer(requestListener)
// server.listen(8080)


//manejo errores de Mónica

// const http = require ('http')
// const fs = require ('fs')
// const log = require ('./logger')
// const {argv: [, , port = 8080]} = process
// const requestListener = (req, res) => {
//   const path = req.url
//   const rs = fs.createReadStream(`.${path === '/' ? '/index.html' : path}`)
  
//     if(path !== 'favicon.ico'){
//       rs.on('data', body => {
//       res.end(body);
//     })
//       rs.on('error', error => {
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')
//     })
//   }else{
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')
//   }
//   req.on('error', error =>{
//       log.error(error)
//       res.writeHead(404)
//       res.end('NOT FOUND')
//   })
// }
// log.info('starting server')
// const server = http.createServer(requestListener);
// server.listen(port);
