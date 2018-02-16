import React from 'react';
import {store} from "./main.js";
import "./whole.css";
import {browserHistory} from "react-router";
export class Buttondiv extends React.Component{
    constructor(props){
        super(props);
        this.changecount = this.changecount.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        return this.props.counts != nextProps.counts ? true : false;
    }
    changecount(a){
        browserHistory.push("/page/" + a);
        store.dispatch({type:"wilMount",
            payload:{show:false, slicedArray:[...store.getState().nameReducer.patientDetails.slice((a - 1)*10,((a - 1)*10)+10)],count:a}
        });
    }
    render(){
        let countChange = this.changecount;
        let stores = store.getState().nameReducer;
        return  <div id="butDiv">{
                stores.patientDetails.map(function(val,ind){
                 if((ind+1) % 10 == 1){
                     return <button className = "btn btn-default" style = {{marginLeft:"10px"}}
                             key={ind} onClick={()=>countChange(((ind/10)+1))}>{ind/10+1}</button>
                 }
                })
        }</div>
    }
}
