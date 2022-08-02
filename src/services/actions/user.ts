import { requestPassword, resetPassword, createNewUser, refreshUser, getUser, login, refreshTokenUser, logout } from '../../utils/api';
import { setCookie, getCookie } from '../../utils/cookie';
import { TUser } from '../types/data';
import { AppThunk, AppDispatch } from '../types';

export const CREATE_USER_REQUEST: 'CREATE_USER_REQUEST' = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS' = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR: 'CREATE_USER_ERROR' = 'CREATE_USER_ERROR';

export const PATCH_USER_FAILED: 'PATCH_USER_FAILED' = 'PATCH_USER_FAILED';

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR: 'GET_USER_INFO_ERROR' = 'GET_USER_INFO_ERROR';

export const SEND_MAIL_REQUEST: 'SEND_MAIL_REQUEST' = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS: 'SEND_MAIL_SUCCESS' = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_ERROR: 'SEND_MAIL_ERROR' = 'SEND_MAIL_ERROR';

export const SEND_NEW_PASSWORD_REQUEST: 'SEND_NEW_PASSWORD_REQUEST' = 'SEND_NEW_PASSWORD_REQUEST';
export const SEND_NEW_PASSWORD_SUCCESS: 'SEND_NEW_PASSWORD_SUCCESS' = 'SEND_NEW_PASSWORD_SUCCESS';
export const SEND_NEW_PASSWORD_ERROR: 'SEND_NEW_PASSWORD_ERROR' = 'SEND_NEW_PASSWORD_ERROR';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';

export const LOG_OUT_REQUEST: 'LOG_OUT_REQUEST' = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS' = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED: 'LOG_OUT_FAILED' = 'LOG_OUT_FAILED';

export const CHECK_AUTH: 'CHECK_AUTH' = 'CHECK_AUTH';
export const CHECK_AUTH_CHECKED: 'CHECK_AUTH_CHECKED' = 'CHECK_AUTH_CHECKED';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export interface ICreateUserRequestAction {
  readonly type: typeof CREATE_USER_REQUEST;
}
export interface ICreateUserSuccessAction {
  readonly type: typeof CREATE_USER_SUCCESS;
  readonly payload: TUser;
}
export interface ICreateUserErrorAction {
  readonly type: typeof CREATE_USER_ERROR;
}
export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}
export interface IGetUserInfoRequestAction {
  type: typeof GET_USER_INFO_REQUEST;
}
export interface IGetUserInfoSuccessAction {
  type: typeof GET_USER_INFO_SUCCESS;
  email: string;
  name: string;
}
export interface IGetUserInfoErrorAction {
  type: typeof GET_USER_INFO_ERROR;
}
export interface ISendMailRequestAction {
  type: typeof SEND_MAIL_REQUEST;
}
export interface ISendMailSuccessAction {
  type: typeof SEND_MAIL_SUCCESS;
  success: boolean;
  message: string;
}
export interface ISendMailErrorAction {
  type: typeof SEND_MAIL_ERROR;
}
export interface ISendNewPasswordRequestAction {
  type: typeof SEND_NEW_PASSWORD_REQUEST;
}
export interface ISendNewPasswordSuccessAction {
  type: typeof SEND_NEW_PASSWORD_SUCCESS;
  success: boolean;
  message: string;
}
export interface ISendNewPasswordErrorAction {
  type: typeof SEND_NEW_PASSWORD_ERROR;
}
export interface ILoginRequestAction {
  type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  email: string;
  name: string;
  status: boolean;
}
export interface ILoginErrorAction {
  type: typeof LOGIN_ERROR;
}
export interface ILogOutRequestAction {
  type: typeof LOG_OUT_REQUEST;
}
export interface ILogOutSuccessAction {
  type: typeof LOG_OUT_SUCCESS;
}
export interface ILogOutFailedAction {
  type: typeof LOG_OUT_FAILED;
}
export interface ICheckAuthAction {
  type: typeof CHECK_AUTH;
}
export interface ICheckAuthCheckedAction {
  type: typeof CHECK_AUTH_CHECKED;
}
export interface IRefreshTokenRequestAction {
  type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailedAction {
  type: typeof REFRESH_TOKEN_FAILED;
}

export type TUserActions = 
  | ICreateUserRequestAction
  | ICreateUserSuccessAction
  | ICreateUserErrorAction
  | IPatchUserFailedAction
  | IGetUserInfoRequestAction
  | IGetUserInfoSuccessAction
  | IGetUserInfoErrorAction
  | ISendMailRequestAction
  | ISendMailSuccessAction
  | ISendMailErrorAction
  | ISendNewPasswordRequestAction
  | ISendNewPasswordSuccessAction
  | ISendNewPasswordErrorAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginErrorAction
  | ILogOutRequestAction
  | ILogOutSuccessAction
  | ILogOutFailedAction
  | ICheckAuthAction
  | ICheckAuthCheckedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

export const getPasswordRecovery: AppThunk = (email: string) => {
  return function(dispatch: AppDispatch) {
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

export const changePassword: AppThunk = (password: string, token: string) => {
  return function(dispatch: AppDispatch) {
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

export const registerNewUser: AppThunk = (name: string, email: string, password: string) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: CREATE_USER_REQUEST })
    createNewUser(name, email, password)
      .then(res => dispatch({
          type: CREATE_USER_SUCCESS,
          payload: res
      }))
      .catch(err => dispatch({ type: CREATE_USER_ERROR }))
  }
}

export const loginUser: AppThunk = (email: string, password: string) => {
  return function(dispatch: AppDispatch) {
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

type TRequestParams = {
  accessToken: string
}

export const fetchWithRefresh: AppThunk = (request: (...args: any[]) => any, ...requestParams: TRequestParams[]) => {
  return function (dispatch: AppDispatch) {
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
          dispatch(logout(refreshToken));
          dispatch({ type: REFRESH_TOKEN_FAILED, err: err.message });
          return Promise.reject(err);
        });
    }
  };
};

export const getUserInfo: AppThunk = ({ accessToken }: {accessToken: string}) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_USER_INFO_REQUEST })
    getUser(accessToken as string)
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

export const updateUser: AppThunk = ({ name, email, password, accessToken }: { name: string, email: string, password: string, accessToken: string }) => {
  return function(dispatch: AppDispatch) {
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

export const checkAuth: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    const accessToken = getCookie('accessToken');
    dispatch({ type: CHECK_AUTH });
    if (!!accessToken) {
      dispatch(getUserInfo({ accessToken: `Bearer ${accessToken}` }));
    }
    dispatch({ type: CHECK_AUTH_CHECKED });
  };
};