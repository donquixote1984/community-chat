var io = require('socket.io-client');
var socket = io.connect('http://0.0.0.0:3000');
console.log('socket connectted')
module.exports = socket