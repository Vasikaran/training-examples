import React, { Component } from 'react';
import {browserHistory} from "react-router";
var Home = () => {
    return (<div>
            <div id="header1">Student Details</div>
            <div id="homepage">Welcome. Go to <i className="fa fa-hand-o-right"></i>
            <button id="add" className= "btn btn-primary" onClick={() => browserHistory.push("/add")}>Add Details</button><button id="show" className= "btn btn-primary"  onClick={() => browserHistory.push("/list/page/1")}>Show Details</button>
            </div>
            </div>);
}
export default Home;
