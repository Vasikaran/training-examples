import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory} from "react-router";
import {carFormReducer, carDetailsToProps, setValueToProps} from "./reducerWithMethods";
import store from "./reducerWithMethods";
import {Provider,connect} from "react-redux";
import {Setbutton, Header} from "./Setbutton";
import Setnames from "./Setnames";
import Form from "./Form";
import $ from "jquery";


class App extends React.Component {
	componentWillMount() {
	    var a = this.props.params.id;
	    var b = 0;
	    if(a===undefined || a==1) {
	        browserHistory.push('/page/1');
	        a = 0;
		}
		else if(a==0) {
	        browserHistory.push('/page/1');
		} else {
		    b = (a-1)*5;
		}
	    $.post("/allDetails", {"num":a},  function(data, status){
	        let object = JSON.parse(data);
	        store.dispatch({
	            type:"setValue",
	            payload : {noOfButton : object.Length, carDetailList: object.Array}
	        });
	    });
	}
    render () {
	    var inputNames = store.getState();
        var arr = [];
        var buttons = inputNames.noOfButton;
        for (let i=0; i<buttons; i+=1) {
            arr.push(i);
        }
        let propval = setValueToProps(inputNames);
	    return <div>
	        <Header />
	        <Form selValueFunction={carDetailsToProps()} setInputValues={propval}/>
	        <div id="centerDiv2">
	            <Setnames allMethods ={carDetailsToProps()} detailValues={propval}/></div>
	        <div id="buttonHolder"><Setbutton clickMethod={carDetailsToProps()} butCountArr={arr}/></div>
	    </div>
    }
	componentDidMount() {
	    var setState = this.setState.bind(this);
	    $.post("/getTotalbutton", {num : 0},  function(data, status){
	        let length = JSON.parse(data).Length;
	        setState({noOfButton : length});
	    });
	}
}

const Render = ()=>{
    ReactDOM.render(
        <Provider store={store} >
            <Router history={browserHistory}>
                <Route path={"/"} component={App}></Route>
                <Route path={"/page/:id"} component={App}></Route>
                <Route path={"/:any"} component={App}></Route>
                <Route path={"/ShowValues/:any"} component={App}></Route>
            </Router>
        </Provider>
    ,document.getElementById("container"));
};
store.subscribe(Render);
Render();