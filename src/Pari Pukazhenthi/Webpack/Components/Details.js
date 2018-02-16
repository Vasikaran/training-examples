import {Router,Route,browserHistory} from "react-router";
import React, {Component} from 'react';
import $ from 'jquery';
import {connect} from "react-redux"; 
import list from "../functions/list.js";
import "../style/index.css";

class Details extends Component{
    componentWillMount(){
        let results = "";
        let getResult = this.props.getResult;
        $.ajax({url: "/getDetails", success: function(result){
            results = JSON.parse(result);
            getResult(results);
        }});
    }
    render(){
       let props = this.props;
       let startInd = ((Math.ceil(props.detail.details.length/10))*10)-10;
       if(startInd < 0){
          startInd = 0;
       }
       let list1 = props.detail.details.slice(props.detail.startIndex , props.detail.startIndex+10);
       let p = Math.ceil(props.detail.details.length/10);
       let a = [];
       if (props.detail.details.length > 9){
           for(let i=1;i<=p;i++){
              a.push(<input className="page" onClick={(e) => props.getter("Getter",e)} type="submit" value={i}></input>);
           }
       }
       return (<div id="detailsPage">
           <p className="heading1">All Details</p>
           <div id="inner">{list1.map((ele,ind) => list(ele,ind,props))}{a}</div>
           <button onClick = {() => browserHistory.push('/home')} className="btn btn-default active" id="homepage">Home</button>
       </div>)
    }
}
	        
	        
const mapDetailDispatchToProps = (dispatch) => {
    return {
        getter: (val,e) => {
            let pageNumber = e.target.value*10 - 10;
            dispatch({
                type: val,
                value: pageNumber
            });
        },
        classChanger: (val,e,id) => {
            if(id != Number(e.target.id)){
                dispatch({
                    type: val,
                    value: e.target.id
                });
            }else{
                dispatch({
                    type: val,
                    value: -1
                });
            }
        },
        getResult: (results) => {
            dispatch({
                type: "getResult",
                result: results
           });
        }
    };
};	

const mapDetailStateToProps = (state) => {
    return {detail:state.detail}
};

export default Details = connect(mapDetailStateToProps, mapDetailDispatchToProps)(Details);
	        
	        
	        
	        
	        
	        
	        