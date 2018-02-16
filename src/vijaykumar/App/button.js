import React from 'react';
import $ from "jquery";
import "./whole.css";
import {store} from "./main.js";
import {browserHistory} from "react-router";
export class Button extends React.Component{
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.changeBool = this.changeBool.bind(this);
        this.setstore = this.setstore.bind(this);
    }
    edit(){
        this.props.method(this.props.value);
        browserHistory.push("/edit/" + this.props.ind);
        store.dispatch({type:"wilMount",payload:{edit:true, index:this.props.index}});
    }
    delete(){
        $.post("/delete", {"delvalue":this.props.value},function(data,status){
            data = JSON.parse(data);
            let prop = Math.ceil(data.length/10);
            store.dispatch({ type:"wilMount", payload:{patientDetails: [...data], count : prop ,
                             slicedArray : data.slice((prop - 1)*10,((prop-1)*10)+10)}, support:[...data]});
        });
    }
    setstore(parent){
        let statevalues = Object.values(parent.state);
        let common = store.getState().nameReducer;
        for(let i of common.support){
            i = JSON.parse(i);
            if(i[8]==common.index){
                var getcom = common.support.indexOf(JSON.stringify(i));
                break;
            }
        }
        statevalues.push(common.index);
        $.post("/edit",{"index":getcom,"array":JSON.stringify(statevalues)},function(data,status){
            data = JSON.parse(data);
            let prop = Math.ceil(data.length/10);
            browserHistory.push("/page/"+prop);
            store.dispatch({ type:"wilMount", payload:{patientDetails: data,edit:false,count : prop ,
                                                       slicedArray : data.slice((prop - 1)*10,((prop-1)*10)+10)}});
        });
    }
    changeBool(bool, page){
        browserHistory.push("/page/" + page);
        store.dispatch({ type: "wilMount", payload: {show:bool,edit:bool} });
    }
    render(){
        let type = this.props.type;
        if(type == "Edit"){
            return <button className = {this.props.className} onClick = {this.edit}>{type}</button>
        }
        else if(type == "Delete"){
            return <button className = {this.props.className} onClick = {this.delete}>{type}</button>
        }
        else if(type == "cancel" || type == "Back"){
            return <button onClick={() => this.changeBool(false,store.getState().nameReducer.count)}
                    className = {this.props.className}>{type}</button>
        }
        else if(type == "edit"){
            return <button onClick={() => this.setstore(this.props.onClick)}
                    className = {this.props.className}>{type}</button>
        }
    }
}
