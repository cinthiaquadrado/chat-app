var express = require("express");
const { listen } = require("socket.io");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

users = [];
connections = [];
server.listen(3000);
app.get("/", function (req, resp){
    //rota para localhost
    resp.sendFile(__dirname + "/index.html");
})

io.sockets.on("connection", function(socket) {
    //quando o cliente se conecta ao servidor
    connections.push(socket); //adiciona plug details para customizar o array
    console.log("connected: %s socket connected", connections.length);
    socket.on("disconnect", function(data) {
        //cliente se desconecta do servidor
        connections.splice(connections.indexOf(socket), 1); //deleta os plug details
        console.log("Disconnected: %s socket connected", connections.length);  
    });
    socket.on("send message", function(data){
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});

console.log('Server is listening');