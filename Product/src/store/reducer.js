import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from './actions';
  
  const initialState = {
    isLoggedIn: false,
    token: null,
    error: null,
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, error: null };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload,
          error: null,
        };
      case LOGIN_FAILURE:
        return { ...state, error: action.payload };
      case LOGOUT:
        return { ...state, isLoggedIn: false, token: null };
      default:
        return state;
    }
  }