const net = require('net')
const fs = require("fs")

let connections = 0

const server = net.createServer(socket => {
    socket.on('data', chunk => {
        let routeServer = "index.html"
        
        const response = chunk.toString()
        let route = response.split("/")[1]
        route = route.split(" ")[0]

        if (route === "profile.html" || route === "profile") routeServer = route
        if (route === "register.html" ||route === "register")routeServer = route
        if (route === "login.html" || route === "login") routeServer = route

        if (!routeServer.includes(".html")){
            route += ".html"
        }


fs.readFile(`./${routeServer}`, (error, content) => { // WARN buffering
    if (error) throw error

   
    socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nConnections: ${++connections}\nContent-Type: text/html\n\n${content}\n`) // Content-Type: text/html

    
})
        //console.log(chunk.toString())

        //socket.end(`HTTP/1.1 404
//Connections: ${++connections}
// Content-Type: text/html
// <h1>Not found</h1>
// `)
    })
})

server.listen(8080, ()=> console.log("running on port 8080"))