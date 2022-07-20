import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, SEND_MAIL_REQUEST,  SEND_MAIL_SUCCESS, SEND_MAIL_ERROR, 
  SEND_NEW_PASSWORD_REQUEST, SEND_NEW_PASSWORD_SUCCESS, SEND_NEW_PASSWORD_ERROR, LOGIN_SUCCESS, 
  LOGIN_ERROR, LOGIN_REQUEST, GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_ERROR, CHECK_AUTH, CHECK_AUTH_CHECKED, 
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, LOG_OUT_SUCCESS } from '../actions/user';

const initialState = {
  userEmail: '',
  userName: '',
  userPassword: '',
  messageSuccess: '',
  checkingResponse: '',
  checkingReset: '',
  sendMail: false,
  loading: false,
  createUserError: false,
  passwordResetError: false,
  sendMailError: false,
  getUserError: false,
  loginError: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  refreshTokenError: false,
  isAuthChecked: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
        loading: false
      }
    case CREATE_USER_ERROR:
      return { 
        ...state, 
        loading: false, 
        createUserError: true 
      }

    case SEND_MAIL_REQUEST:
      return { ...state,  loading: true }
    case SEND_MAIL_SUCCESS:
      return { 
        ...state, 
        checkingResponse: action.success,
        messageSuccess: action.message,
        sendMail: true,
        loading: false 
      }
    case SEND_MAIL_ERROR:
      return {
        ...state,
        loading: false,
        sendMailError: true
      }

    case SEND_NEW_PASSWORD_REQUEST:
      return { ...state, loading: true }
    case SEND_NEW_PASSWORD_SUCCESS:
      return { 
        ...state, 
        checkingReset: action.success,
        messageSuccess: action.message,
        loading: false,
        sendMail: false
      }
    case SEND_NEW_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        resetPasswordError: true
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userName: action.name,
        userEmail: action.email,
        loginStatus: true,
        formName: action.name,
        formEmail: action.email,
        loading: false
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loginError: true
      }

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        userName: '',
        userEmail: '',
        formName: '',
        formEmail: '',
        loginStatus: false
      }

      case CHECK_AUTH: {
        return {
          ...state,
          isAuthChecked: false
        }
      }
      case CHECK_AUTH_CHECKED: {
        return {
          ...state,
          isAuthChecked: true
        }
      }

      case REFRESH_TOKEN_REQUEST: {
        return {
          ...state,
          refreshTokenRequest: true,
          refreshTokenFailed: false,
        }
      }
      case REFRESH_TOKEN_SUCCESS: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenFailed: false,
        }
      }
      case REFRESH_TOKEN_FAILED: {
        return {
          ...state,
          refreshTokenRequest: false,
          refreshTokenFailed: true,
          refreshTokenError: true
        }
      }

    case GET_USER_INFO_REQUEST:
      return { ...state, loading: true }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userName: action.name,
        formName: action.name,
        formEmail: action.email,
        userEmail: action.email,
        loading: false
    }
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        getUserError: true
      }
    default:
      return state
  }
}