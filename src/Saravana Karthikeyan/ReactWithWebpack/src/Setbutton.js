import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var Setbutton = (props)=> {
    var thisArr = props.butCountArr;
    return <div id="pagechangeDiv" >{
        thisArr.map((val)=>{
            return <button onClick={()=> props.clickMethod.changePage((val*5), (val))} value={val+1} key={val+1}>{val+1}</button> 
        })
    }</div>
}
var Header = ()=> {
    return <header id="header"><div>CAR LIST</div></header>
}
export {Setbutton, Header};