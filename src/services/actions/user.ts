import { requestPassword, resetPassword, createNewUser, refreshUser, getUser, login, refreshTokenUser, logout } from '../../utils/api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { TUser, TError, TUserResponse } from '../types/data';
import { AppThunk } from '../types';

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
  err: TError
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
  err: TError
}

export function createUserRequest(): ICreateUserRequestAction {
  return { type: CREATE_USER_REQUEST };
}
export function createUserSuccess(payload: TUser): ICreateUserSuccessAction {
  return { type: CREATE_USER_SUCCESS, payload };
}
export function createUserError(): ICreateUserErrorAction {
  return { type: CREATE_USER_ERROR };
}
export function patchUserFailed(): IPatchUserFailedAction {
  return { type: PATCH_USER_FAILED };
}
export function getUserInfoRequest(): IGetUserInfoRequestAction {
  return { type: GET_USER_INFO_REQUEST };
}
export function getUserInfoSuccess(email: string, name: string): IGetUserInfoSuccessAction {
  return { type: GET_USER_INFO_SUCCESS, email, name };
}
export function getUserInfoError(): IGetUserInfoErrorAction {
  return { type: GET_USER_INFO_ERROR };
}
export function sendMailRequest(): ISendMailRequestAction {
  return { type: SEND_MAIL_REQUEST };
}
export function sendMailSuccess(success: boolean, message: string): ISendMailSuccessAction {
  return { type: SEND_MAIL_SUCCESS, success, message };
}
export function sendMailError(err: TError): ISendMailErrorAction {
  return { type: SEND_MAIL_ERROR, err };
}
export function sendNewPasswordRequest(): ISendNewPasswordRequestAction {
  return { type: SEND_NEW_PASSWORD_REQUEST };
}
export function sendNewPasswordSuccess(success: boolean, message: string): ISendNewPasswordSuccessAction {
  return { type: SEND_NEW_PASSWORD_SUCCESS, success, message };
}
export function sendNewPasswordError(): ISendNewPasswordErrorAction {
  return { type: SEND_NEW_PASSWORD_ERROR };
}
export function loginRequest(): ILoginRequestAction {
  return { type: LOGIN_REQUEST };
}
export function loginSuccess(email: string, name: string, status: boolean): ILoginSuccessAction {
  return { type: LOGIN_SUCCESS, email, name, status };
}
export function loginError(): ILoginErrorAction {
  return { type: LOGIN_ERROR };
}
export function logOutRequest(): ILogOutRequestAction {
  return { type: LOG_OUT_REQUEST };
}
export function logOutSuccess(): ILogOutSuccessAction {
  return { type: LOG_OUT_SUCCESS };
}
export function logOutFailed(): ILogOutFailedAction {
  return { type: LOG_OUT_FAILED };
}
export function checkAuthLoading(): ICheckAuthAction {
  return { type: CHECK_AUTH };
}
export function checkAuthChecked(): ICheckAuthCheckedAction {
  return { type: CHECK_AUTH_CHECKED };
}
export function refreshTokenRequest(): IRefreshTokenRequestAction {
  return { type: REFRESH_TOKEN_REQUEST };
}
export function refreshTokenSuccess(): IRefreshTokenSuccessAction {
  return { type: REFRESH_TOKEN_SUCCESS };
}
export function refreshTokenFailed(err: TError): IRefreshTokenFailedAction {
  return { type: REFRESH_TOKEN_FAILED, err };
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

export const logOut = (refreshToken: string): AppThunk => {
  return function (dispatch) {
    dispatch(logOutRequest());
    logout(refreshToken)
      .then((res) => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logOutSuccess());
      })
      .catch((err) => dispatch(logOutFailed()));
  }
}

export const getPasswordRecovery = (email: string): AppThunk => {
  return function (dispatch) {
  dispatch(sendMailRequest())
  requestPassword(email)
    .then(res => dispatch(sendMailSuccess(res.success, res.message)))
    .catch(err => dispatch(sendMailError(err.message)))
  }
}

export const changePassword = (password: string, token: string): AppThunk => {
  return function (dispatch) {
    dispatch(sendNewPasswordRequest())
    resetPassword(password, token)
      .then(res => dispatch(sendNewPasswordSuccess(res.success, res.message)))
      .catch(err => dispatch(sendNewPasswordError()))
  }
}

export const registerNewUser = (name: string, email: string, password: string): AppThunk => {
  return function (dispatch) {
    dispatch(createUserRequest())
    createNewUser(name, email, password)
      .then(res => dispatch(createUserSuccess(res)))
      .catch(err => dispatch(createUserError()))
  }
}

export const loginUser = (email: string, password: string): AppThunk => {
  return function (dispatch) {
    dispatch(loginRequest())
    login(email, password)
      .then(res => {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(loginSuccess(res.user.email, res.user.name, res.success))
      })
      .catch(err => dispatch(loginError()))
  }
}

export const fetchWithRefresh = (request: any, requestParams: { [key: string]: string }): AppThunk => {
  return function (dispatch) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Токен не найдет в хранилище');
    } else {
      dispatch(refreshTokenRequest());
      refreshTokenUser(refreshToken)
        .then((res) => {
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(refreshTokenSuccess());
          return res;
        })
        .then((res) => {
          requestParams = { ...requestParams, accessToken: res.accessToken };
          dispatch(request(requestParams));
        })
        .catch((err) => {
          dispatch(logOut(refreshToken));
          dispatch(refreshTokenFailed(err.message));
          return Promise.reject(err);
        });
    }
  }
}

export const getUserInfo = ({ accessToken }: {accessToken: string}): AppThunk => {
  return function (dispatch) {
    dispatch(getUserInfoRequest())
    getUser(accessToken as string)
      .then(res => dispatch(getUserInfoSuccess(res.user.email, res.user.name)))
      .catch((err) => {
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
          dispatch(fetchWithRefresh(getUserInfo, { accessToken }));
        } else {
          dispatch(getUserInfoError());
          return Promise.reject(err);
        }
      })
  }
}

export const updateUser = ({ name, email, password, accessToken }: { name: string, email: string, password: string, accessToken: string }): AppThunk => {
  return function (dispatch) {
    refreshUser(name, email, password, accessToken)
      .then(res => dispatch(createUserSuccess(res.user)))
      .catch((err) => {
        if (err.message === 'jwt expired' || err.message === 'You should be authorised') {
          dispatch(fetchWithRefresh(updateUser, { name, email, password, accessToken }));
        } else {
          dispatch(patchUserFailed());
          return Promise.reject(err);
        }
      })
  }
}

export const checkAuth = (): AppThunk => {
  return function (dispatch) {
    const accessToken = getCookie('accessToken');
    dispatch(checkAuthLoading());
    if (!!accessToken) {
      dispatch(getUserInfo({ accessToken: `Bearer ${accessToken}` }));
    }
    dispatch(checkAuthChecked())
  }
};