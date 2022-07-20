import { requestPassword, resetPassword, createNewUser, refreshUser, getUser, login, refreshTokenUser, logout } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

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

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED = 'LOG_OUT_FAILED';

export const CHECK_AUTH = 'CHECK_AUTH';
export const CHECK_AUTH_CHECKED = 'CHECK_AUTH_CHECKED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

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

export function registerNewUser(name, email, password) {
  return function(dispatch) {
    dispatch({ type: CREATE_USER_REQUEST })
    createNewUser(name, email, password)
      .then(res => dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res
      }))
      .catch(err => dispatch({ type: CREATE_USER_ERROR }))
  }
}

export function loginUser(email, password) {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST })
    login(email, password)
      .then(res => {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, email: res.user.email, name: res.user.name, status: res.success })
      })
      .catch(err => dispatch({ type: LOGIN_ERROR }))
  }
}


export const fetchWithRefresh = (request, ...requestParams) => {
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Токен не найдет в хранилище');
    } else {
      dispatch({ type: REFRESH_TOKEN_REQUEST });
      refreshTokenUser(refreshToken)
        .then((res) => {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({ type: REFRESH_TOKEN_SUCCESS });
          return res;
        })
        .then((res) => {
          requestParams = { ...requestParams, accessToken: res.accessToken };
          dispatch(request(requestParams));
        })
        .catch((err) => {
          dispatch(logout());
          dispatch({ type: REFRESH_TOKEN_FAILED, err: err.message });
          return Promise.reject(err);
        });
    }
  };
};

export function getUserInfo({ accessToken }) {
  return function(dispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST })
    getUser(accessToken)
      .then(res => dispatch({
          type: GET_USER_INFO_SUCCESS,
          email: res.user.email, 
          name: res.user.name
      }))
      .catch((err) => {
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
          dispatch(fetchWithRefresh(getUserInfo, { accessToken }));
        } else {
          dispatch({ type: GET_USER_INFO_ERROR });
          return Promise.reject(err);
        }
      })
  }
}

export function updateUser({ name, email, password, accessToken }) {
  return function(dispatch) {
    refreshUser(name, email, password, accessToken)
      .then(res => dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res
      }))
      .catch((err) => {
        if (err.message === 'jwt expired' || err.message === 'You should be authorised') {
          dispatch(fetchWithRefresh(updateUser, { name, email, password, accessToken }));
        } else {
          dispatch({ type: PATCH_USER_FAILED });
          return Promise.reject(err);
        }
      })
  }
}

export const checkAuth = () => {
  return function (dispatch) {
    const accessToken = getCookie('accessToken');
    dispatch({ type: CHECK_AUTH });
    if (!!accessToken) {
      dispatch(getUserInfo({ accessToken: `Bearer ${accessToken}` }));
    }
    dispatch({ type: CHECK_AUTH_CHECKED });
  };
};