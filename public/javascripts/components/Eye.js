var React = require('react');
var GlobalActions = require('../actions/GlobalActions');
var $ = require("jquery")
var startx, starty;
var Eye = React.createClass({
	getInitialState: function(){
		return {
			x: 0,
			y: 0
		}
	},
	checkBound: function(x,y,r){
		if(x*x + y*y >=r*r){
			return false;
		}
		else{
			return true;
		}
	},
	_mouseMove: function(event){
		var moving_x = event.pageX;
		var moving_y = event.pageY;
		var offset_x = moving_x - startx;
		var offset_y = moving_y - starty;
		if(this.checkBound(offset_x, offset_y, 30)){
			this.setState({x:offset_x, y:offset_y})
		}
		else{
			var r = Math.sqrt(offset_y*offset_y+offset_x*offset_x);
			var alpha_x =offset_x* 30/r;
			var alpha_y =offset_y*30/r;
			this.setState({x:alpha_x, y:alpha_y})
		}
		var rotate = {};
		rotate.x = 90*this.state.y/30;
		rotate.y = 90*this.state.x/30;
		GlobalActions.rotate(rotate);
	},

	_mouseUp: function(){
		$(document).unbind('mousemove',this._mouseMove)
		$(document).unbind('mouseup', this._mouseUp)
	},
	_mouseDown: function(event){
		$(document).bind('mousemove', this._mouseMove)
		$(document).bind('mouseup', this._mouseUp)
		startx = event.pageX;
		starty = event.pageY;
	},
	render: function() {
		var style = {
			left: this.state.x,
			top: this.state.y
		}
		return (
			<div id="eye">
				<figure className="ball" onMouseDown={this._mouseDown}>
					<span className="shadow"></span>
					<span className="iris" style={style}></span>
				</figure>
			</div>
		);
	}

});

module.exports = Eye;