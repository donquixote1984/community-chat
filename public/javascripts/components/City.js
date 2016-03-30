var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var $ = require('jquery')

var City = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

	getInitialState: function(){
		return {
			cities:[],
			selected_city:{},
			showCities:false,
			loaded:false
		}
	},
	componentWillMount: function(){
		var _this = this
		$.getJSON('cities', function(cities){
			_this.setState({cities: cities, loaded:true, selected_city:cities[0]});
		})
	},
	selectCity: function(city,event){
		event.stopPropagation();
		//var id = event.target.attributes['city-id']
		//this.state.selected_city = this.state.cities[0]
		//this.context.router.push({pathname:'/register/city/community', state:{selected_city:this.state.selected_city}})
		this.setState({selected_city:city, showCities:false})
		return false;
	},
	toggleDropdown: function(event){
		this.setState({showCities: true})
	},
	_onBlur: function(event){
			this.setState({showCities:false})
	},
	_onChange: function(event){
		var value = event.target.value;
		this.setState({selected_city:value})
	},
	_onKeyDown: function(event){
		if(event.keyCode===13){
			this.context.router.push({pathname:'/register/city/community', state:{selected_city:this.state.selected_city}})
		}
	},
	render: function() {
		var _this = this;
		if(!this.state.loaded){
			return null;
		}
		return (
			<div className='register-board'>
				<div className="main-content">
				<label className="input-title">From</label>
				<div className="input-dropdown">
					<input type="text" className="input-content" value={this.state.selected_city.name} onFocus={this.toggleDropdown} onBlur={this._onBlur} onChange={this._onChange} onKeyDown={this._onKeyDown}/>
					{
						<ul className={this.state.showCities?'show':"hide"}>
						{
							this.state.cities.map(function(city){
								return (
									<li key={city.id} >
										<a href="javascript:void(0)" onMouseDown={_this.selectCity.bind(_this, city)}>{city.name}</a>
									</li>
								)
							})
						}
						</ul>
					}
				</div>

				{
						this.state.selected_city?
						<Link className="dropdown-control glyphicon glyphicon-arrow-right" to={{pathname:'/register/city/community', state:{selected_city:this.state.selected_city}}}></Link>:null
					}

				</div>
			</div>
		);

	}

});

module.exports = City;