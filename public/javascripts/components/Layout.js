var React = require('react');
var Building = require('./Building.js')
var grid_x = 16;
var grid_y = 6;
var height_factor = 8;
var Layout = React.createClass({
    componentWillMount: function () {

    },
    render: function(){

        var unit_x = (this.props.size.width-200)/grid_x;
        var unit_y = (this.props.size.height-200)/grid_y;

        var unit_factor = this.props.data.floor/height_factor;
        var left = (this.props.data.coor.x - grid_x/2) * unit_x;
        var top = (this.props.data.coor.y - grid_y/2) * unit_y;


        this.props.style={
            transform:"translateX("+left+"px) translateY("+top+"px)",
           width: unit_x+"px"
        }
        this.props.size = {
            width:unit_x,
            height: unit_x*unit_factor
        }
        return (
           <li className="layout" style={this.props.style}>
               <Building data={this.props.data} size={this.props.size}/>
           </li>
        )
    }
})

module.exports =Layout