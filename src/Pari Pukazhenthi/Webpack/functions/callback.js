import React from "react";
import "../style/index.css";

const callback = function(ele,ind){
   let list1 = ["Name : ","Age : ","Email Id : ","number : "];
   if( ind != 5 && ind != 0){
       return (<div className="det">{list1[ind-1]+ele}</div>);
   }
   return (<i></i>);
};

export default callback;