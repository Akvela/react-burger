import { requestPassword, resetPassword, createNewUser } from '../../utils/api';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_ERROR = 'SEND_MAIL_ERROR';

export const SEND_NEW_PASSWORD_REQUEST = 'SEND_NEW_PASSWORD_REQUEST';
export const SEND_NEW_PASSWORD_SUCCESS = 'SEND_NEW_PASSWORD_SUCCESS';
export const SEND_NEW_PASSWORD_ERROR = 'SEND_NEW_PASSWORD_ERROR';

export const LOGIN_REQUEST = 'lOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

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