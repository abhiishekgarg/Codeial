
module.exports.chatSockets = function(socketServer)
{
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket)
    {
        // console.log('New Connection Received', socket.id);

        socket.on('disconnect', function()
        {
            // console.log('Socket Disconnected');
        });

        
        socket.on('join_room', function(data)
        {
            // console.log('Joining Request Received', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data)
        {
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}