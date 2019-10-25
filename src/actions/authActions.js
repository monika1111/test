import * as types from './actionTypes';
import axios from 'axios'

export const userLoginSuccessAction = (info) => {
    return {
        type : types.USER_LOGIN_SUCCESS,
        ...info
    }
};

export const userLoginErorrAction = (message) => {
  return {
      type : types.USER_LOGIN_ERROR,
      message: message
  }
};

export const fetchUserLoginAction = (info) => dispatch => {
    dispatch({
        type: types.USER_LOGIN
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        'language': 1
      }
    };
    const body = JSON.stringify({ ...info, osType: 3 });
  
    axios
      .post("https://2gatherapi.abmdemo.me/api/auth/login", body, config)
      .then(res => {
        if(res.data.success){
          dispatch( userLoginSuccessAction(res.data));
        } else {
          dispatch(userLoginErorrAction(res.data.message));
        }
        
      })
      .catch(err => {
        // dispatch(userLoginErorrAction());
      });
  };


