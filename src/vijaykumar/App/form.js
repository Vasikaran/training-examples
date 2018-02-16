import $ from "jquery";
import React from 'react';
import {store} from "./main.js";
import {rerender} from "./main.js";
import {Ptag} from "./main.js";
import "./whole.css";
import {browserHistory} from "react-router";
export class Form extends React.Component{
    constructor(props){
        super(props);
        this.bhistory = this.bhistory.bind(this);
        this.setVal = this.setVal.bind(this);
        this.addValue = this.addValue.bind(this);
    }
    componentDidMount(){
        rerender(this);
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    bhistory(){
        store.dispatch({type:"wilMount",payload:{show:false,edit:false}});
        $.get("/alldetail",
            function(data,status){
                data = JSON.parse(data);
                browserHistory.push("/page/" + Math.ceil(data.length/10));
        });
    }
    setVal(e,a,b){
        let obj = {};
        obj[store.getState().formReducer.states[a]] = e.target.value;
        store.dispatch({
            type:"setValue",
            payload:obj
        });
    }
    addValue(state){
        var count = 0, detarray = [];
        var stores = store.getState().formReducer;
        stores.states.map(function(val,ind){
            state[val] == "" ? count++ : detarray.push(state[val]);
        });
        if(count == 0) {
            store.dispatch({
                type:"addValues",
                payload: {patientName :"", patientAge :"", patientGender :"", mobileNumber :"",
                          bloodGroup :"", occupation :"", fatherName: "", address : "",
                    states: ["patientName","patientAge","patientGender","mobileNumber","bloodGroup","occupation","fatherName","address"],
                    fieldnames :["Name","Age","Gender","Mobile Number","Blood Group","Occupation","Father/Husband Name","Address"]
                }
            });
            $.get("/alldetail",function(data,status){
                data = JSON.parse(data);
                let temp = 0;
                if(data.length>0){
                    let value = data[data.length-1];
                    value = JSON.parse(value);
                    temp = value[8];
                }
                detarray.push((temp) +1);
                $.post("/details", { "array": JSON.stringify(detarray) });
            });
        }
    }
    render() {
        var propes = store.getState().formReducer;
        var setvalue = this.setVal;
        var maps = propes.fieldnames.map(function(val,ind){
                     return <div className = "spacing" key = {val+ind}>
                                <Ptag clas = "a" value = {val}/>
                                <input id = {"inp"+(ind+1)} value = {propes[propes.states[ind]]}
                                type = "text" onChange = {(event) =>  setvalue(event,ind,propes)} />
                            </div>
                    });
        return  <div>
                    <h4 id = "header"><b>Patient details</b></h4>
                    <div id = "detaildiv">
                    <h3 className = "title"><b>Add details</b></h3>{ maps}
                    <button id = 'but1' className = "btn btn-primary"
    	             onClick = {()=> this.addValue(propes)} >Add Patient</button>
                    </div>
                    <div className="rightdiv">
                        <button onClick = {this.bhistory} id = "but2" className = "btn btn-primary">Details</button>
                    </div>
                </div>
	        }
}
