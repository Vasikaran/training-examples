import React from "react";
import LineElement from "./LineElement.js"
var Marksbox = (props) => {
    return (
        <pre className="well"  onClick={() => {props.setId(props.obj.stu_id)}}>
            {
                props.keys.map(function(ele,ind){
                    return <LineElement key={100+ind}  prefix={ele} value={props.obj[ele]} />
                })
            }
        </pre>
        )
}
export default  Marksbox;
