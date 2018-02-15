import React from "react";
import {Router,Route,browserHistory} from "react-router";
import Form from "./Form";
import Show from "./Show";
import Header from "./Header";

export default  class App extends React.Component {
    render(){


        return (
                <div className="root">
                  <Header />
                  <Router history={browserHistory}>
                      <Route path="/details" component={Show} >
                          <Route path="page/:number" component={Show} />
                      </Route>
                      <Route path="*" component={Form} />
                  </Router>
                </div>
            );
    }
}
