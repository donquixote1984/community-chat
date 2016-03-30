var React= require('react');
var socket = require('../socket/socket.js')
var Building = require('./Building.js');
var $ = require('jquery');
var GlobalConstants = require('../constants/GlobalConstants.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GlobalActions = require('../actions/GlobalActions.js');

var MessageStore = require('../stores/MessageStore.js');

var World = React.createClass({
    getInitialState: function(){
        return {
            width: $(window).width(),
            height:$(window).height(),
            buildings:[],
            messages: MessageStore.getAll()
        }
    },
    componentDidMount: function(){
        var _this = this;
        if(localStorage['buildings']){
          var buildings = JSON.parse(localStorage['buildings']);
          _this.setState({buildings:buildings })
        }
        /*socket.on('join', function(id){
            if(window.localstorage && localstorage[id]){

            }
            else{
                socket.emit('fetch-building', id);
                socket.on('build', function(data){
                   _this.setState({buildings:data.buildings})
                })
            }

        })*/
        MessageStore.addChangeListener(_this._onChange)
        socket.on(GlobalConstants.SOCKET_RECEIVE_MESSAGE, function(data){
          GlobalActions.receive_message(data);
        })

    },
    _onChange: function(){
        this.setState({messages: MessageStore.getAll()})
    } ,
    render: function () {

        var size = {
            width: this.state.width,
            height: this.state.height
        }
        var messageContainer = {}

        this.state.messages.forEach(function(message){
          console.log(message)
            if(!messageContainer[message.from]){
               messageContainer[message.from] = []
            }
            messageContainer[message.from].push(message);
        })
        console.log(messageContainer)
       return (
          <div className='world'>
            {
              this.state.buildings.map(function(building){
                 return (
                    <Building size={size} data={building} messages={messageContainer[building.name]}/>
                 )
              })
            }
          </div>
       )
    }
})

module.exports = World