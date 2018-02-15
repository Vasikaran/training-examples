import React from "react";
import MarkBox from "./MarkBox.js";
 function Detail (props) {
    let keys  = [
        "name",
        "age",
        "email",
        "phone"
        ];

    return (props.obj.visible == true) ? <MarkBox {...props} keys={keys} /> :
            <pre className="well" onClick={() => {
                props.setId(props.obj.stu_id)}
            }>{props.obj.name}
            </pre>
}
export default  Detail;
