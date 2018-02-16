import ReactDOM from 'react-dom';
import React from 'react';
import {connect, Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {Router, Route,browserHistory} from "react-router";
import $ from "jquery";
import "./whole.css";
import {Namediv} from "./name.js";
import {Form} from "./form.js";
import {Buttondiv} from "./buttondiv.js";
const initialState = {
    formReducer :{  patientName :"", patientAge :"", patientGender :"", mobileNumber :"",
                    bloodGroup :"", occupation :"", fatherName: "", address :"",
                    states: ["patientName","patientAge","patientGender","mobileNumber","bloodGroup","occupation","fatherName","address"],
                    fieldnames :["Name","Age","Gender","Mobile Number","Blood Group","Occupation","Father/Husband Name","Address"],id:0
    },
    nameReducer :{  patientDetails:[], count:0, ind:0, show:false, edit:false, slicedArray:[], search:[],support:[] , index:0,setTime:0,
                    states: ["patientName","patientAge","patientGender","mobileNumber","bloodGroup","occupation","fatherName","address"],
                    fieldnames :["Name","Age","Gender","Mobile Number","Blood Group","Occupation","Father/Husband Name","Address"],value:""
    }
}
const nameReducer = (state, action) => {
    if(state === undefined) { return true }
    else{
        switch(action.type){
            case "wilMount":
                state = Object.assign({},state,action.payload);
                break;
        }
        return state;
    }
}
const formReducer = (state, action) => {
    if(state === undefined) {
        return true;
    }else{
        switch(action.type){
            case "setValue":
                state = Object.assign({}, state, action.payload);
            break;
            case "addValues":
                state = Object.assign({}, action.payload);
            break;
    }
    return state;
    }
}
export const store = createStore(combineReducers({formReducer,nameReducer}),initialState);
class Home extends React.Component{
    browsehistory(){
        browserHistory.push("/form");
    }
    browhistory(){
        $.get("/alldetail",
        function(data,status){
            data = JSON.parse(data);
            browserHistory.push("/page/"+ Math.ceil(data.length/10));
            store.dispatch({type:"wilMount",payload:{show:false,edit:false}});
        });
    }
    componentWillMount(){
        browserHistory.push("/");
    }
    componentDidMount(){
        rerender(this);
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
    return  (<div>
                <h4 id="header"><b>Patient details</b></h4><br/><br/>
                <div className = "center">
                    <button onClick = {this.browsehistory} className = "btn btn-primary">Form</button>
                    <span style={{color:"white"}}>asdf</span>
                    <button onClick = {this.browhistory} className = "btn btn-primary">Details</button>
                </div>
            </div>);
    }
}
export function rerender(context){
    context.unsubscribe = store.subscribe(() => {
        context.forceUpdate();
    });
}
export const Ptag = (props) => {
        if (props.click !== undefined){
            return <p className = {props.clas} id ={props.id} onClick = {props.click}>{props.value}</p>
        }
        else{
            return <p className = {props.clas}>{props.value}{props.children}</p>
        }
}
ReactDOM.render(<Provider store = {store}>
                    <Router history = {browserHistory}>
                        <Route path="/" component={Home}/>
                        <Route path="/form" component={Form}/>
                        <Route path="/page" component={Namediv}>
                            <Route path=":number" component={Namediv}/>
                        </Route>
                        <Route path="/name" component={Namediv}>
                            <Route path=":ind" component={Namediv}/>
                        </Route>
                        <Route path="/edit" component={Namediv}>
                            <Route path=":index" component={Namediv}/>
                        </Route>
                        <Route path="/*" component={Home}/>
                    </Router>
                 </Provider>, whole);
