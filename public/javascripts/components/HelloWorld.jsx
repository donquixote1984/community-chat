var React = require('react');
var io = require('socket.io-client')
var HelloWorld = React.createClass({
    componentDidMount: function(){
        var socket = io.connect('http://localhost:3000');
        socket.emit('new');
        socket.on('echo', function(data){
        })
    },
    render: function(){
        return (
            <div>HEllo WOrld@</div>
        )
    }
})
module.exports = HelloWorld;