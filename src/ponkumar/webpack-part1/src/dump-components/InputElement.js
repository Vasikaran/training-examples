import React from "react";
String.prototype.toUpperCaseFirstLetter = function () {
    return this[0].toUpperCase()+this.slice(1);
}
export default  function InputElement (props) {
    return  (
            <div className="form-group row">
                <label htmlFor={props.prekey} className="col-sm-1 col-form-label">{props.prekey.toUpperCaseFirstLetter()}</label>
                <div className="col-sm-3">
                    <input type={(props.prekey == "password") ? "password" : "text"} onChange={(event) => props.onChange(props.prekey,event)} className="form-control-plaintext" id={props.prekey} value={props.value} />
                </div>
                {(props.isError) ?(
                <div className="col-sm-4">
                    <span className="form-control-plaintext alert-danger" >{props.error}</span>
                </div>) :<div></div> }
            </div>
          )

}
