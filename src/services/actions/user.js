import { requestPassword, resetPassword, createNewUser, refreshUser, getUser, login } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_ERROR = 'SEND_MAIL_ERROR';

export const SEND_NEW_PASSWORD_REQUEST = 'SEND_NEW_PASSWORD_REQUEST';
export const SEND_NEW_PASSWORD_SUCCESS = 'SEND_NEW_PASSWORD_SUCCESS';
export const SEND_NEW_PASSWORD_ERROR = 'SEND_NEW_PASSWORD_ERROR';

export const LOGIN_REQUEST = 'lOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_USER = 'LOGOUT_USER';

export function getPasswordRecovery(email) {
  return function(dispatch) {
    dispatch({ type: SEND_MAIL_REQUEST })
    requestPassword(email)
      .then(res => dispatch({
          type: SEND_MAIL_SUCCESS,
          success: res.success,
          message: res.message
      }))
      .catch(err => dispatch({ type: SEND_MAIL_ERROR }))
  }
}

export function changePassword(password, token) {
  return function(dispatch) {
    dispatch({ type: SEND_NEW_PASSWORD_REQUEST })
    resetPassword(password, token)
      .then(res => dispatch({
          type: SEND_NEW_PASSWORD_SUCCESS,
          success: res.success,
          message: res.message
      }))
      .catch(err => dispatch({ type: SEND_NEW_PASSWORD_ERROR }))
  }
}

export function registerNewUser(name, email, password, token) {
  return function(dispatch) {
    dispatch({ type: CREATE_USER_REQUEST })
    createNewUser(name, email, password, token)
      .then(res => dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res
      }))
      .catch(err => dispatch({ type: CREATE_USER_ERROR }))
  }
}

export function updateUser(name, email, password, token) {
  return function(dispatch) {
    refreshUser(name, email, password, token)
      .then(res => dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res
      }))
  }
}

export function getUserInfo(token) {
  return function(dispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST })
    getUser(token)
      .then(res => dispatch({
          type: GET_USER_INFO_SUCCESS,
          email: res.user.email, 
          name: res.user.name
      }))
      .catch(err => dispatch({ type: GET_USER_INFO_ERROR }))
  }
}

export function loginUser(email, password, token) {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST })
    login(email, password, token)
      .then(res => {
        setCookie('token', res.accessToken.split('Bearer ')[1], { expires: 1200000 });
        setCookie('refreshToken', res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, email: res.user.email, name: res.user.name, status: res.success })
      })
      .catch(err => dispatch({ type: LOGIN_ERROR }))
  }
}