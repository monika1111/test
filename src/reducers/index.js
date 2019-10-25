import {combineReducers} from 'redux';
import auth from "./authReducer";
import dashboard from "./dashboardReducer";

export default combineReducers({
    auth, dashboard
});
