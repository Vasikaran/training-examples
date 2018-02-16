import * as executefunc  from "./appfunctions.js";
import $ from "jquery";
import React, { Component } from 'react';
import style from '../App/employee.css';
const updatedv = <div className={style.btnDv}>
	                 <button onClick={() => executefunc.SaveDetail(executefunc.store.getState().oneEmp)} className={[style.sbtn,"btn","btn-primary","btn2"].join(" ")} >Save</button>
	                 <button onClick={() => executefunc.CancelDetail()} className={[style.sbtn,"btn","btn-primary","btn2"].join(" ")} >Cancel</button>
	               </div>
const headDiv  = <div className={style.heading}>
                    <span>Employee Details</span>
                    <input className={style.srchInpt} placeholder="Search Name" onChange={(e) => executefunc.searchName(e)}/>
                    <button className={[style.chngbtn,"btn","btn-info"].join(" ")} onClick={() => executefunc.addEmployeeForm()}>Add Employee</button>
                 </div>

class HomeComponent extends Component{
  render(){
    return(
        <div>
            <div className={style.heading}>
                <span>Employee Details</span>
            </div>
            <div className={style.underDiv} >
                <div className={style.btnDivs}>
                    <button className={["btn", style['btn-primary'],'btn-primary'].join(" ")} onClick={() => executefunc.addEmployeeForm()} >Add Employee</button>
                    <button className={["btn", style['btn-primary'],'btn-primary'].join(" ")} onClick={() => executefunc.EmployeeDetailsForm()} >Employee Details</button>
                </div>
            </div>
        </div>
    );
  }
}
export {HomeComponent, headDiv, updatedv};
