import React, { Component } from 'react';
import store from "./store";
import { goBack } from "./AllFunctions";
class PersonalDetail extends Component{
    componentDidMount(){
        store.subscribe(() => {
                this.forceUpdate()
            });
    }
    render(){
         let value = store.getState().index.allDetails;
         return (<div><div id="alldetail">Details About {value.name}</div><div id="persondetail"><img src={value.photo}/><p>Name : <b> {value.name}</b></p><p>Age : <b>{value.age}</b></p><p>DOB : <b>{value.dob}</b></p><p>Gender : <b>{value.gender}</b></p><p>Roll No : <b>{value.rollno}</b></p><p>Qualification : <b>{value.standard}</b></p><p>Blood Group : <b>{value.bloodgroup}</b></p><button className = "back btn btn-primary" onClick = {goBack}><i className="fa fa-hand-o-left"></i> Back</button></div></div>);
    }
}
export default PersonalDetail;
