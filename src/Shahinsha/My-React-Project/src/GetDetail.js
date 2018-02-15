import React, { Component } from 'react';
import {browserHistory} from "react-router";
import InputElement from "./InputElement";
import { ChangeValue , changeDetails , cancel , addDetails } from "./AllFunctions";
import store from "./store";
class GetDetail extends Component{
    render(){
        let props = this.props.value;
        let save;
        if (props.index.edit){
            save = <button className = "btn btn-primary" onClick = {() => {addDetails({...props.index})}}>Add</button>;
        } else {
            save = <div id="changeButton"><button className = "btn btn-primary" onClick = {() => {browserHistory.push("/list/page/"+store.getState().show.page);changeDetails({...props.index})}}>Save</button><button className="btn btn-primary" onClick={() => cancel("/add")}>Cancel</button></div>;
        }
        return (
        <div>
            <div id="header"><button className = "btn btn-primary" onClick={() => browserHistory.push("/home")}><i className="fa fa-hand-o-left"></i> Home</button><span>Student Details</span></div>
            <div id="search"><button className = "btn btn-primary" onClick={() => cancel("/list/page/"+props.show.page)}>Show Details <i className="fa fa-hand-o-right"></i></button></div>
            <div id="seedetails">
                <div id="Getdetails">
                     <div>
                    <p className="title">Enter Student Detail</p>
                    <InputElement placeholder= "Enter Name" title="Name" value={props.index.name} method = {(e) => ChangeValue("name",e)}/><br / >
                    <InputElement placeholder= "Enter Age" title="Age" value={props.index.age} method = {(e) => ChangeValue("age",e)}/><br / >
                    <InputElement placeholder= "Enter DOB" title="DOB" value={props.index.dob} method = {(e) =>ChangeValue("dob",e)}/><br / >
                    <InputElement placeholder= "Enter Gender" title="Gender"  value={props.index.gender} method = {(e) => ChangeValue("gender",e)}/><br / >
                    <InputElement placeholder= "Enter Photo URL" title="Photo URL"  value={props.index.photo} method = {(e) => ChangeValue("photo",e)}/><br / >
                    <InputElement placeholder= "Enter Roll No" title="Roll No" value={props.index.rollno} method = {(e) => ChangeValue("rollno",e)}/><br / >
                    <InputElement placeholder= "Enter Qualification" title="Qualifcation" value={props.index.standard} method = {(e) => ChangeValue("standard",e)}/><br / >
                    <InputElement placeholder= "Enter BloodGroup" title="Blood Group" value={props.index.bloodgroup} method = {(e) => ChangeValue("bloodgroup",e)}/><br / >
                    {save}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default GetDetail;
