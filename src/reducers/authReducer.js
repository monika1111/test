import {USER_LOGIN, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token           : localStorage.getItem('token'),
    isLoading       : false,
    user            : null,
    loginErrorMessage: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLoading : true
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading       : false,
                token           : action.data.authToken,
                user            : action.data,
                loginError: false
            };
        case USER_LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token           : null,
                isLoading       : false,
                user            : null,
                loginErrorMessage: action.message
            };
        default:
            return state;
    }
};
export default authReducer;
