const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const PORT = process.env.PORT || 5000
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// 1. add connection
io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('join', ({ name, room }) => {
    // 2. add user to userslist
    const { user, error } = addUser({ id: socket.id, name, room })
    if (error) return callback(error);

    // 3. make user join the room
    socket.join(user.room)

    // 4. send usersList to FE
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    // 5. send message about joining to the room
    socket.broadcast.emit('message', { user: 'admin', text: `${user.name} has joined the room` })

    // 6. send welcome message to joinee
    socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to the room ${user.room}` })

  })

  // 7. sending message from input
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback();
  })

  // 8. on dissconnect removing user 
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })

})



server.listen(PORT, console.log(`server started at port:${PORT}`));