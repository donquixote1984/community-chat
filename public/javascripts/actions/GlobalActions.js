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
  }


  

};

module.exports = GlobalActions;