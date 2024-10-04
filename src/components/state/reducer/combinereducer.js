import { combineReducers } from "redux";
import loginreducer from './loginreducer'

const reducer=combineReducers({
    loggedin:loginreducer 
})
export default reducer
