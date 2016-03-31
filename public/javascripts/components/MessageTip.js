var React = require('react');
var MessageTip = React.createClass({

	render: function() {
		return (
			<div>
				<div className="message-board-title">{this.props.message.time} {this.props.message.name} : </div>
				<div className="message-board-content">{this.props.message.text}</div>
			</div>
		);
	}

});

module.exports = MessageTip;