const checkRegex = (ele,state,ele1,dispatch) => {
    let check = 0;
    if(ele1.name == "age" || ele1.name == "number"){
       if(ele1.pattern.test(ele)){
           dispatchError("",ele1.name,dispatch)
           check+=2;
       }else{
            dispatchError("invalid "+ele1.name,ele1.name,dispatch);
       } 
    }else{
        if(ele1.pattern.test(ele)){
            check++;
            if(ele.length <= ele1.maxLength && ele.length >= ele1.minLength){
                check+=1;
                dispatchError("",ele1.name,dispatch)
	        }else{
	             dispatchError(ele1.name+" must be greater than "+ele1.minLength+" and less than "+ele1.maxLength+" characters",ele1.name,dispatch);
	        }
       }else{
            dispatchError("invalid "+ele1.name,ele1.name,dispatch);
       } 
    }
    return check == 2;
}

const dispatchError = (val,key,dispatch) => {
    dispatch({
        type: "setError",
        val: val,
        key: key
    })
}

export default checkRegex;




















