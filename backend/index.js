// const express = require('express')
// const {createServer} = require('node:http')
// const cors =require('cors')
// const GameManager = require('./src/GameManager');



// const app = express()
// const server = createServer(app);
// app.use(cors())

// const port = 3000

// const {Server} = require('socket.io');
// const io = new Server(server
// //     , {
// //     cors: {
// //       origin: "http://localhost:5173", 
// //       credentials: true
// //     }
// // }
// )

// const gameManager = new GameManager();


// io.on('connection', (socket) => {
//     console.log(`Socket ${socket.id} connected`);

//     gameManager.addUser(socket);

//     socket.on('disconnect', () => {
//         console.log(`Socket ${socket.id} disconnected`);
//         gameManager.removeUser(socket);
//     })
// });


// app.get('/',(req,res)=>{
//     res.send('<h1>Hello</h1>')
// })

// server.listen(port,(err)=>{
//     if(err){
//         console.log('Server error Occured'+err.message)
//     }else{
//         console.log('connected to port http://localhost:'+port)
//     }
// })



// import { WebSocketServer } from 'ws';

const WebSocketServer = require('ws').WebSocketServer;
const GameManager = require('./src/GameManager');

const gameManager = new GameManager();

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);
    
    gameManager.addUser(socket);

//   ws.on('error',console.error);

//   ws.on('message', (data) => {
//     console.log('received',data);
//   })

  socket.on('diconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
    gameManager.removeUser(socket);
  });

  socket.send('something');
});

