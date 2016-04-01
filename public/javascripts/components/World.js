var React= require('react');
var socket = require('../socket/socket.js')
var Building = require('./Building.js');
var $ = require('jquery');
var GlobalConstants = require('../constants/GlobalConstants.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var GlobalActions = require('../actions/GlobalActions.js');
var Eye = require('./Eye.js')
var MessageStore = require('../stores/MessageStore.js');
var TransformStore = require('../stores/TransformStore.js');
var cube = require('../../stylesheets/eye.less')
var World = React.createClass({
    getInitialState: function(){
        return {
            width: $(window).width(),
            height:$(window).height(),
            buildings:[],
            messages: MessageStore.getAll(),
            transforms: TransformStore.getAll()
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
        MessageStore.addChangeListener(_this._onChange);
        TransformStore.addChangeListener(_this._onTransform);
        socket.on(GlobalConstants.SOCKET_RECEIVE_MESSAGE, function(data){
          GlobalActions.receive_message(data);
        })

    },
    _onChange: function(){
        this.setState({messages: MessageStore.getAll()})
    } ,
    _onTransform: function(){
        this.setState({transforms: TransformStore.getAll()})
    },
    render: function () {

        var size = {
            width: this.state.width,
            height: this.state.height
        }
        var messageContainer = {}

        this.state.messages.forEach(function(message){
            if(!messageContainer[message.from]){
               messageContainer[message.from] = []
            }
            messageContainer[message.from].push(message);
        });
        var transform_string = "rotateX("+this.state.transforms.rotate.x+"deg)"+
        "rotateY("+this.state.transforms.rotate.y+"deg)"+
        "rotateZ("+this.state.transforms.rotate.z+"deg)"+
        "translateX("+this.state.transforms.translate.x+"px)";

        var transform_style = {
          transform: transform_string
        };
       return (
          <div className='world' style={transform_style}>
            {
              this.state.buildings.map(function(building){
                 return (
                    <Building key={building.id} size={size} data={building} messages={messageContainer[building.name]}/>
                 )
              })
            }
          </div>
       )
    }
})

module.exports = World