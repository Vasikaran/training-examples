import React from 'react';
import ReactDOM from 'react-dom';
import "../style/index.css"

const InputElement = (props) => {
    return (<div><div className="form-group">
        <div className="col-sm-10">
            <input type={props.type} value={props.value} className="form-control" onChange={props.method} placeholder={"Enter your "+props.field} />
        </div><br/>
        <div className="col-sm-10" id="errorField">{props.errorValue}</div>
        </div></div>)
}

export default InputElement;