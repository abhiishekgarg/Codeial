

module.exports.chatSockets = function(socketServer)
{
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket)
    {
        console.log('New connection received', socket.id);

        socket.on('disconnect', function()
        {
            console.log('Socket Disconnected');
        });
    });
}