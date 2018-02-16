import {Router,Route,browserHistory} from "react-router";
import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import Application from "./Components/application.js";
import Details from "./Components/Details.js";

export default class App extends Component {
    render(){
        return (
                <div id="whole">
                    <Router history={browserHistory}>
                        <Route path="/" component={Application} />
                        <Route path="/home" component={Application} />
                        <Route path="/details" component={Details} />
                        <Route path="*" component={Application} />
                    </Router>
                </div>
        );
    }
}
// ReactDOM.render(<App/>,document.getElementById("whole"));