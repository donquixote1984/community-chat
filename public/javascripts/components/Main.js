var normalize = require("normalize.css/normalize.css");
var World = require('./World.js');
var MessageComposer= require('./MessageComposer.js')
var React = require('react');
var MessageBoard = require('./MessageBoard.js')
var Main = React.createClass({

	render: function() {
		return (
			<div className='world-wrapper'>
				<World/>
				<MessageBoard/>
				<MessageComposer/>
			</div>
		);
	}

});

module.exports = Main;
