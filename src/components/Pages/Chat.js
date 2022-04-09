import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("ws://localhost:8900"); // Подключаемся к сокет соединению

// Создаём компонент для чата
const Chat = () => {

    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('message', message => {
            console.log(message);
        })
        socket.on('SET_USERS', data => {
            console.log(data);
        })
    }, []);

    const onMessage = (e) => {
        e.preventDefault();
        socket.emit('message', message);
        socket.emit('JOIN_ROOM', {
            userName: 'Alex',
            roomId: 4
        })
    }

    // Создаём разметку для чата
    return (
        <div>
            <input type='text' placeholder='input text' onChange={e => setMessage(e.target.value)} />
            <button onClick={onMessage}>Отправить</button>
        </div>
    );
}

export default Chat;