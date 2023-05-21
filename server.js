const io = require('socket.io')(3000,{
    cors:{
        origin:"*",
    }
});
const users={};

io.on('connection', (socket) => {
    socket.on("new-user",Username=>{
        users[socket.id]=Username;
        console.log(users);
        socket.broadcast.emit("user-name",Username);
    })
  socket.on("send-chat-message",message=>{
    console.log(users);
    socket.broadcast.emit("chat-message",{msg:message,user:users[socket.id]});
  })
  socket.on("disconnect",()=>{
    socket.broadcast.emit("user-disconnected",users[socket.id]);
    delete users[socket.id];
  })
});

