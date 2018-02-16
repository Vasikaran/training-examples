import {browserHistory} from "react-router";
import React from 'react';
import InputElement from "./inputElement.js";
import {connect} from "react-redux";
import checkRegex from "../functions/checkRegex.js";
import $ from "jquery";
import "../style/index.css";

function Application(props){
   let valueList = Object.keys(props.user);
   if(browserHistory.getCurrentLocation().pathname != "/home"){
       browserHistory.replace("/home");
   }
    return (<div id="appPage">
    <p className="heading">Application Form</p>
      {
          valueList.map(
            (ele,i) =>  <InputElement errorValue={props.user[ele].error} value = {props.user[ele].value} type={props.user[ele].type} field={ele} method = {(e) => props.setDetail(ele,e)}/>
          )
      }
      <button onClick = {() => props.setResult(props.user) } className="btn btn-default active" id="submit">Submit</button>
      <button onClick = {() => browserHistory.push('/details')} className = "btn btn-default active" id="detailpage">Details</button>
    </div>)
}

const mapHomeDispatchToProps = (dispatch) => {
    return {
        setDetail: (val,e) => {
            dispatch({
                type: "setDetail",
                key: val,
                value:e.target.value
            });
        },setResult: (state) => {
            let check = 0;
            let valueList = Object.values(state);
            for(let i of valueList){
                if(checkRegex(i.value,state,i,dispatch)){
                    check++;
                }
            }
    	    if(check == 5 ){
    	    	$.post("/addDetails",{obj:JSON.stringify(state)}, function(data, status){
        	    	if(status == "success"){
        	    	    alert(data);
        	    	    dispatch({
        	    	        type: "clearValues"
        	    	    })
        	    	}
    	    	});
            }else{
        	    alert("Please Fill The all Details correctly");
        	}
        }
    };
};
	        
const mapHomeStateToProps = (state) => {
    return {user:state.user}
};

export default Application = connect(mapHomeStateToProps, mapHomeDispatchToProps)(Application);











