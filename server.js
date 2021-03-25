const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080
let messages = [{
    id : 1,
    text : "Hola fui emitido",
    autor : "Mr. Yo"
},
]

app.use(express.static('public'));

app.get("/", (req, res) =>{
    res.status(200).send("Hello world!");
})


io.on("connection", (socket) =>{
    console.log("Alguien se ha conectado con socket");
    socket.emit('message', messages);

    socket.on('new-message', function(data){
        messages.push(data);
        
        io.sockets.emit('message', messages);
    })
})



http.listen(port, () => {
    console.log("El servidor http está corriendo en el puerto " + port);
})