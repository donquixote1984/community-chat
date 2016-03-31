var io = require('socket.io-client');
var socket = io.connect('/');
console.log('socket connectted')
module.exports = socket
