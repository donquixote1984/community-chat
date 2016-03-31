var AppDispatcher = require('../dispatcher/AppDispatcher');
var GlobalConstants = require('../constants/GlobalConstants.js');
var GlobalActions = {

  /**
   * @param  {string} text
   */
  send_message: function(message) {
    AppDispatcher.dispatch({
      actionType: GlobalConstants.SEND_MESSAGE,
      message: message
    });
  },

  receive_message: function(message){
  	AppDispatcher.dispatch({
      actionType: GlobalConstants.RECEIVE_MESSAGE,
      message:message
    });
  },

  rotate: function(rotate){
    AppDispatcher.dispatch({
      actionType: GlobalConstants.ROTATE,
      rotate: rotate
    })
  },
  transform: function(transform){
    AppDispatcher.dispatch({
      actionType: GlobalConstants.TRANSFORM,
      transform:transform 
    })
  }

};

module.exports = GlobalActions;