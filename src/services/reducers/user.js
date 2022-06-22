import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, CHANGE_EMAIL, CHANGE_NAME, CHANGE_PASSWORD,SEND_MAIL_REQUEST, 
  SEND_MAIL_SUCCESS, SEND_MAIL_ERROR, SEND_NEW_PASSWORD_REQUEST, SEND_NEW_PASSWORD_SUCCESS, SEND_NEW_PASSWORD_ERROR, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/user';

const initialState = {
  userEmail: '',
  userName: '',
  userPassword: '',
  sendUser: false,
  createUserError: false,
  passwordResetError: false,
  sendMailError: false,
  messageSuccess: '',
  checkingResponse: '',
  checkingReset: '',
  status: false,
  formName: '',
  formEmail: '',
  formPassword: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, sendUser: true }
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
        sendUser: false
      }
    case CREATE_USER_ERROR:
      return { 
        ...state, 
        sendUser: false, 
        createUserError: true 
      }
    case CHANGE_EMAIL:
      return { ...state, formEmail: action.email }
    case CHANGE_NAME:
      return { ...state, formName: action.name }
    case CHANGE_PASSWORD:
      return { ...state, formPassword: action.password }
    case SEND_MAIL_REQUEST:
      return { ...state,  status: true }
    case SEND_MAIL_SUCCESS:
      return { 
        ...state, 
        checkingResponse: action.success,
        messageSuccess: action.message,
        status: false 
      }
    case SEND_MAIL_ERROR:
      return {
        ...state,
        status: false,
        sendMailError: true
      }
    case SEND_NEW_PASSWORD_REQUEST:
      return { ...state, status: true }
    case SEND_NEW_PASSWORD_SUCCESS:
      return { 
        ...state, 
        checkingReset: action.success,
        messageSuccess: action.message,
        status: false 
      }
    case SEND_NEW_PASSWORD_ERROR:
      return {
        ...state,
        status: false,
        resetPasswordError: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        userName: action.name,
        userEmail: action.email,
        loginStatus: action.status,
        formName: action.name,
        formEmail: action.email
      }
    default:
      return state
  }
}