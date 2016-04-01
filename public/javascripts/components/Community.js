var ReactRouter = require('react-router')
var Link = ReactRouter.Link;
var React = require('react');
var $  = require('jquery')

var Community = React.createClass({


	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
	getInitialState:function(){
		return {
			communities:[],
			buildings:[]
		}
	},
	componentWillMount: function(){
		var _this = this;
		

		var defer = $.getJSON('communities');
		defer.then(function(communities){
			_this.setState({communities: communities})	;
			var defaultCommunity = communities[0]||{}
			defaultCommunity.selected = true
			return $.getJSON('buildings/'+defaultCommunity.id);
		}).done(function(buildings){
			if(buildings.length>0){
				buildings[0].selected = true
			}
			_this.setState({buildings: buildings})
		})

	},

	selectCommunity: function(community, event){
		var _this = this;
		this.state.communities.forEach(function(com){
			com.selected = false;
		})

		community.selected = true;

		localStorage['community'] = JSON.stringify(community);
		$.getJSON('/buildings/'+community.id, function(buildings){
			if(buildings.length>0){
				buildings[0].selected = true;
			}
			_this.setState({buildings: buildings});
		})
	},
	selectBuilding: function(building, event){
		this.state.buildings.forEach(function(b){
			b.selected = false;
		})
		building.selected = true;
		this.setState({buildings: this.state.buildings})
		localStorage['building'] = JSON.stringify(building);
	},	 

	next: function(){
		this.state.buildings.forEach(function(building){
			if(building.selected){
				localStorage['building'] = JSON.stringify(building);
			}
		});

		this.state.communities.forEach(function(community){
			if(community.selected){
				localStorage['community'] = JSON.stringify(community);
			}
		})
		localStorage['buildings'] = JSON.stringify(this.state.buildings);
		
		this.context.router.push({pathname:'main'});
	},
	render: function() {
		var _this = this;
		return (
			<div className="register-community-board container-fluid" >
				<ul className="select-field">
					<li className="row">
						<label className="col-md-4">Please Select Community : </label>
						<div className="select-list col-md-6">
							<ul >
								{
									this.state.communities.map(function(community){
										return (
											<li key={community.id} className={community.selected?'selected':''}>
												<a href="javascript:void(0)" onClick={_this.selectCommunity.bind(_this, community)}>{community.name}</a>
											</li>
											)
									})
								}
							</ul>
						</div>
					</li>
					<li className="row">
						<label className="col-md-4">Please Select Buildings : </label>
						<div className="select-list col-md-6">
							<ul>
								{
									this.state.buildings.map(function(building){
										return  (
											<li key={building.id} className={building.selected?'selected':""}>
												<a href="javascript:void(0)" onClick={_this.selectBuilding.bind(_this,building)}>
													{building.name}
												</a>
											</li>
										)
									})
								}
							</ul>
						</div>
					</li>

					<li className="row">
						<label className="col-md-4"></label>
						<div className="select-list col-md-6">
								<a className='next-stage' href="javascript:void(0)" onClick={this.next}>NEXT</a>
						</div>
					</li>
				</ul>	
			</div>
		)
	}

});

module.exports = Community;