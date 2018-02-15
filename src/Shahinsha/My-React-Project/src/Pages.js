import React, { Component } from 'react';
import { selectPage } from "./AllFunctions";
import store from "./store";
var Pages = (props) => {
        let val = Math.ceil(props.value.length/10);
        let value = [];
        for(let i = 1;i<=val;i++){
            if (store.getState().show.page == i){
                value.push(<button  className = "select btn btn-primary" onClick = {selectPage}>{i}</button>);
            } else{
                value.push(<button  className = "btn btn-primary" onClick = {selectPage}>{i}</button>);
            }
        }
        return <div>{value}</div>
}

export default Pages;
