import React, { Component } from 'react';

var InputElement = (props) =>{
   return <input placeholder={props.placeholder}  title={props.title} value={props.value} onChange ={props.method} />
}
export default InputElement;
