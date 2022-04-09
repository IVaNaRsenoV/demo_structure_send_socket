require('dotenv').config();
const express = require('express'); // Подключаем библиотеку express
const cors = require('cors'); // Подключаем библиотеку cors
const { Server } = require('socket.io'); // Подключаем библиотеку socket.io
const http = require('http'); // Подключаем библиотеку http

const PORT = process.env.PORT || 3000; // Достаём с файла .env адресс порта

const app = express();
const server = http.createServer(app); // Создаём сервер, внутрь ложим механизм express

// Создаём объект для того, чтобы работать с сокетами
const io = new Server(server, {
    cors: '*'
});

app.use(express.json());
app.use(cors());

// Подключаем сокет соединение
io.on('connection', (socket) => {
    socket.on('message', message => {
        console.log(message)
        io.sockets.emit('message', message);
    })

    socket.on('JOIN_ROOM', ({ userName, roomId }) => {
        console.log(userName, roomId)
        socket.join(roomId);
        socket.broadcast.to(1).emit('SET_USERS', 'roomId = 1')
        socket.broadcast.to(2).emit('SET_USERS', 'roomId = 2')
        socket.broadcast.to(3).emit('SET_USERS', 'roomId = 3')
        socket.broadcast.to(4).emit('SET_USERS', 'roomId = 4')
    })

})

// Слушаем сервер
server.listen(PORT, () => {
    console.log(`SERVER WORKED ${PORT}`);
})