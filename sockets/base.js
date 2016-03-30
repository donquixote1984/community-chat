module.exports = function (io) {
    io.on('connection', function(socket){
       /* socket.on('new',function(data){
            socket.emit('echo','this is mine');
        })*/
        console.log('connect')
        socket.on('region', function(id){
            socket.join(id);
            socket.emit('join', id);
        })
        socket.on('SOCKET_SEND_MESSAGE', function(message){
            socket.broadcast.emit('SOCKET_RECEIVE_MESSAGE',message);
        })
        socket.on('fetch-building', function(id){
            socket.emit('build', data);
        })
    })


}