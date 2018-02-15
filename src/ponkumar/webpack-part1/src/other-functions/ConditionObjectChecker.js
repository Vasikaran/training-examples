

const regex = {
        "all"       : /^.+$/,
          "text"      : /^[a-zA-Z]+$/,
          "number"    : /^\d+$/,
          "email"     : /^[a-z]([._]?[a-z\d])*@([a-z]\.?)*[a-z]\.[a-z]+$/,
          "password"  : /^(?=.*\d)(?=.*[\W_])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/,
          "phone"     : /^[1-9][0-9]{9}$/
      }

export default   function ConditionObjectChecker(ConditionObject,value) {
        console.log("(ConditionObject,value)",ConditionObject,value,regex[ConditionObject.type])
    if (regex[ConditionObject.type].test(value+"")){
        if (ConditionObject.type == "number") {
            if ((ConditionObject.minimam < Number(value)) && (ConditionObject.maximam > Number(value))) {
                return true ;
            } else {
                return " is must be greater than "+ConditionObject.minimam+" and lesser than "+ConditionObject.maximam;
            }
        } else if (ConditionObject.type == "phone") {
            return true ;
        } else {
            if ((ConditionObject.maxLength > value.length) && (ConditionObject.minLength < value.length)) {
                return true ;
            } else {
                return " is must have length greater than "+ConditionObject.minLength+" and lesser than "+ConditionObject.maxLength;
            }
        }
    } else if ((ConditionObject.isMandatory == false)&& (value.length == 0)){
        return true;
    } else {
        return " is invalid "
    }
}
