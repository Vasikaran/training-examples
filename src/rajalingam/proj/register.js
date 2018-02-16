import React from "react";
import ReactDOM from "react-dom";
import {store} from "./full.js";
export class Register extends React.Component{
  fulldetail(index){
     store.dispatch({
         type: "index",
         payload : store.getState().details.list1[index]
     });
           store.dispatch({
               type: "visible",
               payload : !store.getState().details.show
           });
 }

 componentWillReceiveProps(props) {
    if(props.checkfullview == false){
       this.setState({show : false });
     }
 }

render(){
   var storee=this.fulldetail;
    if (!store.getState().details.show){
         return<div id="inf"> <div> {
            store.getState().details.list1.map(function(val,ind){
                 return   <div className="leave" onClick= {()=>storee(ind)} >
                             <p > Name :  {val[0]} </p>
                         </div>
              })
           }</div> </div>

    } else {
         return    <div className="leave" onClick= {storee} >
                      <p> Name :        {store.getState().details.index[0]} </p>
                      <p> Employee_Id : {store.getState().details.index[1]} </p>
                      <p> Mobile_No :   {store.getState().details.index[2]} </p>
                      <p> E_mail Id :   {store.getState().details.index[3]} </p>
                      <p> Reason :      {store.getState().details.index[4]} </p>
                      <p> From_Date :   {store.getState().details.index[5]} </p>
                      <p> To_Date :     {store.getState().details.index[6]} </p>
                   </div>
     }
}
}
