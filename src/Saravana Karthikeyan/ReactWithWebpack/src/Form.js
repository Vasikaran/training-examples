let detailNameList = ["Company Name","Model Name", "Fuel type","Price","Seating Capacity", "Displacement (cc)", "Max Power (bhp@rpm)", "Max Torque (Nm@rpm)", "Mileage (ARAI) (kmpl)", "Alternate Fuel", "Transmission Type", "No of gears (Gears)", "Airbags"];
let inputNameList = ["CompanyName","ModelName", "FuelType","Price","SeatingCapacity", "Displacement", "MaxPower", "MaxTorque", "Mileage", "AlternateFuel", "TransmissionType", "NoOfGears", "AirBags"];
import React, { Component } from 'react';
import {Router,Route,browserHistory} from "react-router";
console.log(detailNameList);
var Form = (props)=> {
    return <div id="centerDiv1">
        <div id="main">
            <div id="formHeader">Add-Detail Form</div>
            <div id="instructionDiv">{
                detailNameList.map(function(val){
                    return <div>{val}</div>
                })
            }
            </div>
            <div id="semicolonDiv">{
                detailNameList.map(function(val){
                    return <div>:</div>
                })
            }
            </div>
            <div id="inputDiv">{
                inputNameList.map((val,ind) => {
                    return <input placeholder={detailNameList[ind]} title={val} onChange={(e)=> props.selValueFunction.setDetail(e)}  value={props.setInputValues[val]}/>
                })
            }
            </div>
            <div id="formFooter"><button onClick={(e)=> props.selValueFunction.addDetails(props.setInputValues)}>Submit</button></div>
        </div>
    </div>
}

export default Form;
export {inputNameList};