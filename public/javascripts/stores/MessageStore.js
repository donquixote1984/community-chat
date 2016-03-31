var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var GlobalConstants = require('../constants/GlobalConstants.js');
var GlobalActions = require('../actions/GlobalActions')
var CHANGE_EVENT =  'change';
var _messages = [];
var _message_window_size = 30;
var AppDispatcher = require('../dispatcher/AppDispatcher.js')

var socket = require('../socket/socket.js');
var add_message = function(message){
  

	if(_messages.length>=_message_window_size){
		_messages.shift();
	}
	_messages.push(message);
}



var MessageStore = assign({}, EventEmitter.prototype,{

	getAll: function() {
    	return _messages;
  	},
	emitChange: function() {
    	this.emit(CHANGE_EVENT);
  	},
	addChangeListener: function(callback) {
    	this.on(CHANGE_EVENT, callback);
  	},
  	removeChangeListener: function(callback) {
    	this.removeListener(CHANGE_EVENT, callback);
  	}

})


AppDispatcher.register(function(action){
  switch(action.actionType) {
    case GlobalConstants.SEND_MESSAGE:
      if (action.message) {
        socket.emit(GlobalConstants.SOCKET_SEND_MESSAGE, action.message);
        add_message(action.message);
        MessageStore.emitChange();
      }
      break;
    case GlobalConstants.RECEIVE_MESSAGE:
      if(action.message){
        add_message(action.message);
        MessageStore.emitChange()
      }
      break; 

    default:
      // no op
      break;
  }
})

module.exports = MessageStore;