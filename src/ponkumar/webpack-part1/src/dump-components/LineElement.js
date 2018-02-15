import React from "react";
String.prototype.toUpperCaseFirstLetter = function () {
    return this[0].toUpperCase()+this.slice(1);
}
export default  function LineElement (props) {
    /**
     * sample props :
     *  props = {
            prefix : "Email",
            value : "example.@mail.com",
        b}
     */
    return  <div className="row">
                <div className="col-sm-1" >{props.prefix.toUpperCaseFirstLetter()}</div>
                <div className="col-sm-4" >{props.value}</div>
            </div>
}
