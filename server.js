const express = require('express');
require('dotenv').config();
const path = require('path');
const router = require('./routes/homeRoute');
const app = express();
const connect = require('./config/db');

const PORT = process.env.PORT || 3000;
//json body
app.use(express.json())
//connect database
connect();
//set static files
app.use(express.static(path.join(__dirname, '/public/')))
//set ejs engine
app.set('view engine', 'ejs');

//set router
app.use(router);



const server = app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
})

//socket config
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    socket.on('comment',(data)=>{
        data.time = Date();
        socket.broadcast.emit('comment',data);
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
})
