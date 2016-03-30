var React = require('react');
var $ = require('jquery');
var RegionDropdown = React.createClass({
	getInitialState: function(){
		return {
			items:[],
			item:null,
			showDropdown: false
		}
	},
	componentWillMount: function(){
		var _this = this;
		$.getJSON(this.props.url, function(data){
			localStorage[_this.props.name] = data[0];
			_this.setState({items: data, item: data[0]});
			_this.props.onload(data)

		})
	},

	componentWillReceiveProps: function(newProps){

		if(this.props.url!==newProps.url){
			var _this = this;
			$.getJSON(newProps.url, function(data){
				localStorage[_this.props.name] = data[0];
				_this.setState({items:data, item:data[0]})
				_this.props.onload(data)
			})
		}
	},

	componentWillUpdate: function(){
	},
	_onBlur: function(){
		this.setState({showDropdown:false});
	},

	_onFocus: function(){
		this.setState({showDropdown:true})
	},
	selectItem: function(item, event){
		this.setState({item:item, showDropdown:false})
		this.props.selectItem(item);
	},
	_onChange: function(event){
		this.setState({item: event.target.value});
	},


	render: function() {
		var _this = this
		return (
			<div>
				<label className="input-title">From</label>
				<div className="input-dropdown">
					<input type="text" className="input-content" value={this.state.item?this.state.item.name:""} onFocus={this._onFocus} onBlur={this._onBlur} onChange={this._onChange}/>
					{
						<ul className={this.state.showDropdown?'show':"hide"}>
						{
							this.state.items.map(function(item){
								return (
									<li key={item.id} >
										<a href="javascript:void(0)" onMouseDown={_this.selectItem.bind(_this, item)}>{item.name}</a>
									</li>
								)
							})
						}
						</ul>
					}
				</div>
			</div>
		);
	}

});

module.exports = RegionDropdown;