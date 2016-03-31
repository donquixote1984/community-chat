var React = require('react');
var cube = require('../../stylesheets/cube.less')
var grid_x = 14;
var grid_y = 6;
var height_factor = 8;

var Building = React.createClass({
    getInitialState: function(){
        return {
            messages:[],
            blink:false
        }
    },
    componentWillReceiveProps: function(newProps){
        this.setState({blink:false})
        if(newProps.messages){
            if(newProps.messages.length>3){
                this.setState({blink:true,messages:newProps.messages.slice(newProps.messages.length-3, newProps.messages.length)});
            }
            else{
                this.setState({blink:true,messages: newProps.messages});
            }
        }
    },
    render: function(){

        var unit_x = (this.props.size.width-200)/grid_x;
        var unit_y = (this.props.size.height-100)/grid_y;
        var unit_factor = this.props.data.floor/height_factor;
        var left = (this.props.data.coord_x) * unit_x;
        var top = (this.props.data.coord_y) * unit_y;

        
        var floor_height = unit_x * this.props.data.floor/height_factor;

        var top_style = {
            transform:"translateZ("+(unit_x-40)+"px)"
        } 
        var message_playe_style = {
            transform:"translateX(20px) translateY(20px) translateZ("+(unit_x-35)+"px)"
        }
        var back_style = {
            height: this.props.size.height+"px",
        }

        var right_style = {
            height: this.props.size.height+"px",
        }

        var left_style = {
            height: this.props.size.height+"px",
        }

        var translateY = this.props.size.height - this.props.size.width/2
        

        var position_style={
            left: left,
            top: top,
            width: unit_x,
            height: unit_x,
            transform:"scaleZ("+this.props.data.floor/height_factor+")"
        }

        var message_style={
            width: unit_x,
            height: unit_x
        }

        var bottom_style = {
            height: this.props.size.width+"px",
        }

        

        return (
            <div className="building" style={position_style}>
                
                <ul className={"plane-wrapper "+(this.state.blink?"message-blink":"")}>
                	<li className="plane front"></li>
                    <li className="plane back"></li>
                    <li className="plane left"></li>
                    <li className="plane right"></li>
                    <li className="plane top"  style={top_style}>
                        {this.props.data.name}
                    </li>
                    {
                        this.state.messages.length>0?
                        <li className="top message-plane" style={message_playe_style}>
                            <ul className="message-box">
                                    {
                                        
                                        this.state.messages.map(function(message){
                                            return (
                                                <li>
                                                    <div className="message-title">{message.time} {message.name}</div>
                                                    <div className="message-content">{message.text}</div>
                                                </li>
                                            )
                                        })
                                    }
                            </ul>
                        </li>:null
                    }
                </ul>
            </div>
        )
    }
})
module.exports = Building;