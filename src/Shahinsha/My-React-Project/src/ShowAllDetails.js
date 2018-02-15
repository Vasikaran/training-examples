import React, { Component } from 'react';
import { editDetails , delDetail } from "./AllFunctions";
var ShowAllDetails = (props) =>{
        let person = props.method;
        let value = props.alldetail.studentDetailsList;
        if (value[0] == undefined){
            value = [];
        };
        if (props.alldetail.check){
            if (value.length == 0){
                return <div id="detail">No Details Added</div>
            }
            else{
                 return (<div>{value.map(function(cv,ind){
                     return <div><p id='detail' onClick={() => person(value[ind])}>{cv.name}</p>
                    <i className="fa fa-edit" id="iconEdit" onClick={() => editDetails(value[ind])}></i>
                     <i className="fa fa-trash" id="iconDel" onClick={() => delDetail(value[ind],value.length,props.alldetail.page)}></i></div>
                     })}</div>);
            }
        }
}

export default ShowAllDetails;
