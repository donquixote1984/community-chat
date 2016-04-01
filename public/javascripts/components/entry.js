require('bootstrap/dist/css/bootstrap.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./Main.js')
var App = require('./Application.js')
var Register = require('./Register.js')
var ReactRouter = require('react-router');
var City = require('./City.js');
var Community = require('./Community')
var Router = ReactRouter.Router
var Route = ReactRouter.Route;
var HashHistory = ReactRouter.hashHistory;
function requireAuth(nextState, replace){
	if(!localStorage["community"]||!localStorage["name"]||!localStorage['building']){
		replace({
	      pathname: '/register',
	      state: { nextPathname: nextState.location.pathname }
    	})
	}
}
var routes = (
  <Route path="/" handler={App}>
    <Route path="/main" handler={Main} onEnter={requireAuth}/>
    <Route path="/register" handler={Register} />
  </Route>
);

//React.render(<Main/>, document.getElementById('content'))
ReactDOM.render(
<Router history={HashHistory}>
    <Route path="/" component={App}>
      <Route path="register" component={Register} ></Route>
      <Route path="register/community" component={Community} ></Route>
      <Route path="main" component={Main} onEnter={requireAuth} />
    </Route>
  </Router>, document.getElementById('content'))