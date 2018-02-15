import store from './passengers_details_js';
import React , {Component} from 'react';
import nextpage from './functionsfile'
const Buttons_creation = (props) => {
    let details_obj = (store.getState()).detailsobj;
    let pagenumber = 0;
        return <div id= "Buttoncontainer">{(details_obj).map((value , ind) => {
            if(ind%10 == 0){
                return <button className = "pagechange" onClick={nextpage} >{pagenumber+=1}</button>
            }
        })
    }</div>
}
export default Buttons_creation;
