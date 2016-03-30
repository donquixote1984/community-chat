var ReactRouter = require('react-router')
var Link = ReactRouter.Link;
var React = require('react');
var $  = require('jquery')

var Community = React.createClass({

	getInitialState:function(){
		return {
			communities: [],
			showCommunities:false,
			selected_community:null,
			loaded:false
		}
	},
	componentWillMount: function(){
		var _this = this;
		var city_id = this.props.location.state.selected_city.id;
		$.getJSON('community/'+city_id, function(data){
			_this.setState({communities: data, loaded:true, selected_community:data[0]});
		})
	},
	selectCommunity: function(community, event){
		this.setState({selected_community: community})
	},
	toggleDropdown: function(event){
		this.setState({showCommunities: !this.state.showCommunities})
	},
	_onChange: function(event){
		this.setState({selected_community: event.target.value})
	},
	render: function() {
		var _this = this;
		if(!this.state.loaded){
			return null;
		}
		return (
			<div className='register-board'>
				<div className="main-content">
				<label className="input-title">Community : </label>
				<div className="input-dropdown">
					<input type="text" className="input-content" value={this.state.selected_community.name} onFocus={this.toggleDropdown} onBlur={this.toggleDropdown} onChange={this._onChange} onKeyDown={this._onKeyDown}/>
					{
						this.state.showCommunities?<ul>
						{
							this.state.communities.map(function(community){
								return (
									<li key={community.id} >
										<a href="javascript:void(0)" onMouseDown={_this.selectCommunity.bind(_this, community)}>{community.name}</a>
									</li>
								)
							})
						}
						</ul>:null
					}
				</div>

				{
						this.state.selected_community?
						<Link className="dropdown-control glyphicon glyphicon-arrow-right" to={{pathname:'/register/city/community', state:{selected_community:this.state.selected_community}}}></Link>:null
					}

				</div>
			</div>
		);
	}

});

module.exports = Community;