var React = require('react');
var GlobalActions = require('../actions/GlobalActions.js')
var ENTER_KEY_CODE = 13;
var moment = require('moment')
var MessageComposer = React.createClass({
	getInitialState: function(){
		return {
			text: ""
		}
	},
	_save: function(text){
		var message = {
			text: text,
			from: JSON.parse(localStorage['building']).name,
			name: localStorage['name'],
			channel: JSON.parse(localStorage['community']).name,
			time: moment().format("HH:mm:ss")
		}
		GlobalActions.send_message(message);
	},
	textChange: function(event){
		this.setState({text:event.target.value})	
			
	},
	keyDown: function(event){
		if (event.keyCode === ENTER_KEY_CODE) {
      		this._save(this.state.text);
      		this.setState({text:''})
    	}
	},
	render: function() {
		return (
			<div id="message">
				<input type="text" placeholder="SomeThings..." onChange={this.textChange} onKeyDown = {this.keyDown}/>
			</div>
		);
	}

});

module.exports = MessageComposer;