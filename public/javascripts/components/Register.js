require('../../stylesheets/main.less')
var React = require('react');
var $  = require('jquery');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var RegionDropdown = require('./RegionDropdown')

var Register = React.createClass({

	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},

	getInitialState: function(){
		return { 
			name:localStorage['name'],
			city:localStorage['city'],
			community:localStorage['community'],
			building: localStorage['building'],
			city_url: "cities",
			community_url:"community",
			building_url:'buildings'
		}
	},
	componentWillMount: function(){
	},
	
	
	selectCity: function(city){
		this.setState({city: city, community_url:"community/"+city.id})
	},

	onCityload: function(cities){
		var city = cities[0];
		this.setState({city:city,community_url:"community/"+city.id})
	},
	onCommunityLoad: function(communities){
		var community = communities[0];
		this.setState({community:community, building_url:"buildings/"+community.id})
	},
	onBuildingLoad: function(buildings){
		localStorage["buildings"] = JSON.stringify(buildings);
		this.setState({building: buildings[0]})
	},
	selectCommunity: function(community){
		this.setState({community: community, building_url:"buildings/"+community.id})
	},
	selectBuilding: function(building){
		this.setState({building: building});
	},
	_onChange: function(event){
		this.setState({name: event.target.value})
	},
	next: function(){
		localStorage["name"] = this.state.name;
		//localStorage["community"] = JSON.stringify(this.state.community);
		//localStorage["building"] = JSON.stringify(this.state.building);
		this.context.router.push({pathname:'/register/community'})
	},
	_onKeyDown: function(event){
		if(event.keyCode === 13 && this.state.name.trim()!=''){
			this.next();
		}
	},
	render: function() {
		var _this = this;
		return (
			<div className='register-board container-fluid'>
				<div className="main-content row">
					<label className="input-title col-md-4">Please input your name : </label>
					<input className="input-content col-md-6" type="text" value={this.state.name?this.state.name:""} onChange={this._onChange} onKeyDown={this._onKeyDown} />
					{/*<RegionDropdown url="communities" selectItem={this.selectCommunity} name="community" onload = {this.onCommunityLoad}/>
					<RegionDropdown url={this.state.building_url} selectItem={this.selectBuilding} name="building" onload={this.onBuildingLoad}/>
					*/}
				</div>
				<div>
					<a className="next-stage" href="javascript:void(0)" onClick={this.next}>NEXT</a>
				</div>
			</div>

			
		);
	}
});

module.exports = Register;