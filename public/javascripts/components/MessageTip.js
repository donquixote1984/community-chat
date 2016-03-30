var React = require('react');
var MessageTip = React.createClass({

	render: function() {
		return (
			<div> {this.props.text}</div>
		);
	}

});

module.exports = MessageTip;