var React = require('react');
var GlobalActions = require('../actions/GlobalActions');
var $ = require("jquery")
var startx, starty;
var interval,offset_x=0, offset_y=0;
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
		offset_x = moving_x - startx;
		offset_y = moving_y - starty;
		if(Math.abs(offset_x)>Math.abs(offset_y)){
			offset_x = offset_x>0?30:-30;
			offset_y = 0;
		}
		else{
			offset_x = 0;
			offset_y = offset_y>0?30:-30;
		}
			this.setState({x:offset_x, y:offset_y})
	},

	_mouseUp: function(){
		$(document).unbind('mousemove',this._mouseMove)
		$(document).unbind('mouseup', this._mouseUp)
		this.setState({x:0, y:0})
		clearInterval(interval);
	},
	_mouseDown: function(event){
		$(document).bind('mousemove', this._mouseMove)
		$(document).bind('mouseup', this._mouseUp)
		startx = event.pageX;
		starty = event.pageY;
		var transform = {
			rotate:{},
			translate:{}
		}
		interval = setInterval(function(){
			transform.rotate.x = -offset_y/30;
			transform.rotate.y = 0;

			transform.translate.x = offset_x/30*10;

			GlobalActions.transform(transform);
		}, 50);
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