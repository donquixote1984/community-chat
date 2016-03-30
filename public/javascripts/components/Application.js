var React = require('react');

var Application = React.createClass({

	render: function() {
		return (
			<div className="application">
				{this.props.children}
			</div>
		);
	}

});

module.exports = Application;