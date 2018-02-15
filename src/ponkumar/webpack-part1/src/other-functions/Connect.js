import formReducer from "../reducers/fromReducer.js";
import showReducer from "../reducers/showReducer.js";
import {createStore,combineReducers} from "redux";
import React from "react";
var store = createStore(combineReducers({form : formReducer , show : showReducer}),{});
export default  function Connect (mapState,mapDispatch,Component ){
    return  class  extends React.Component {
                constructor () {
                    super();
                    this.state = {count : 0};
                }
                componentDidMount(){
                    this.unsubscribe = store.subscribe(() => {
                          if (this.updater.isMounted(this)){
                              this.setState({count : this.state.count + 1});
                          } else {
                               this.unsubscribe();
                          }
                    });
                }
                render(){
                    let props = this.props;
                    props = Object.assign({},props,mapState( store.getState()));
                    Object.assign(props,mapDispatch(store.dispatch));
                    return <Component  {...props} />
                }
                componentWilUnmount (){
                   console.log("componentWilUnmount");
                }
            }
}
