var React = require('react');
var MessageStore = require('../stores/MessageStore.js');
var MessageTip = require('./MessageTip.js')
var ReactDOM = require('react-dom');
var MessageBoard = React.createClass({

	getInitialState: function(){
		return {
			messages: MessageStore.getAll()
		}
	},

	componentDidMount: function() {
    	MessageStore.addChangeListener(this._onChange);
  	},
  	_onChange:function(){
  		this.setState({messages: MessageStore.getAll()})
  	},
  	componentDidUpdate: function() {
  		var node = ReactDOM.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},
	render: function() {
		return (
			<div id="message-board">
				<ul>
					{
						this.state.messages.map(function(message){
							return (<li key={message.uuid}><MessageTip message={message}/></li>)
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = MessageBoard;