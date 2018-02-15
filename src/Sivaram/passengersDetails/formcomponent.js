import store from './passengers_details_js';
import React , {Component} from 'react';
import {browserHistory} from 'react-router';
import { editfunc , submitfunc , valuechange } from './functionsfile';
var Inputtagscreate = (props) => {
    let currentstate = store.getState();
        return <div>{
            (currentstate.inputtype).map((currentvalue)=>{
                          return <input id = {currentvalue} type = "text" placeholder = {currentvalue} value={currentstate[currentvalue]} onChange={valuechange}></input>
           })
            }</div>
}
const Details_form = (props) => {
    let currentstate = store.getState();
        let intext;
        let func;
    if (!(currentstate.edit == "")){
        intext = "Save";
        func = editfunc
    } else {
        intext = "Submit";
        func = submitfunc
    }
        return <div>
        <div id="formdiv">
        <p>PASSENGERS DETAILS LIST</p>
        { <Inputtagscreate value={props.route.value}/>} <button id="submit" onClick={func}>{intext}</button>
        <button  className = "homebutton" onClick = {() => { browserHistory.push("/view")}}>Show Deatils</button>
           </div>
           </div>
}
export default Details_form ;
