var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var GlobalConstants = require('../constants/GlobalConstants.js');
var GlobalActions = require('../actions/GlobalActions')
var CHANGE_EVENT =  'change';
var _transform = {
    rotate:{
      x:0,
      y:0,
      z:0
    },
    translate:{
      x:0,
      y:0,
      z:0
    }
};
var AppDispatcher = require('../dispatcher/AppDispatcher.js')


var add_rotate = function(rotate){
  _transform.rotate.x+=rotate.x;
  _transform.rotate.y+=rotate.y;
  _transform.rotate.z+=0;
}

var add_translate = function(translate){
  _transform.translate.x += translate.x;
  _transform.translate.y +=translate.y;
  _transform.translate.z +=translate.z;
}
var add_transform = function(transform){
  add_rotate(transform.rotate);
  add_translate(transform.translate);
}
var TransformStore = assign({}, EventEmitter.prototype,{

	getAll: function() {
    	return _transform;
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
    case GlobalConstants.ROTATE:
        add_rotate(action.rotate);
        TransformStore.emitChange();
      break;
    case GlobalConstants.TRANSFORM:
        add_transform(action.transform);
        TransformStore.emitChange();
    default:
      // no op
      break;
  }
})

module.exports = TransformStore;