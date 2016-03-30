var React = require('react');
var MessageStore = require('../stores/MessageStore.js');
var MessageTip = require('./MessageTip.js')

var MessageBoard = React.createClass({

	getInitialState: function(){
		return {
			messages: MessageStore.getAll()
		}
	},

	componentDidMount: function() {
		console.log(this.state)
    	MessageStore.addChangeListener(this._onChange);
  	},
  	_onChange:function(){
  		this.setState({messages: MessageStore.getAll()})
  	},
	render: function() {
		return (
			<div id="message-board">
				<ul>
					{
						this.state.messages.map(function(message){
							return (<li><MessageTip text={message.text}/></li>)
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = MessageBoard;