import { CLICK_ON_ORDER, CLOSE_MODAL_ORDER, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_AUTH_CONNECTION_SUCCESS, 
  WS_AUTH_CONNECTION_GET_MESSAGE, WS_AUTH_CONNECTION_ERROR } from "../actions/orders";

const initialState = {
  ordersAll: null,
  ordersUser: null,
  currentOrder: {},
  orderIsClicked: false,
  wsConnected: false,
  ordersError: false
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_ON_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
        orderIsClicked: true
      }
    case CLOSE_MODAL_ORDER:
      return {
        ...state,
        currentOrder: {},
        orderIsClicked: false
      }

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }
    case WS_GET_MESSAGE:
      return {
        ...state,
        ordersAll: action.payload
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected:false
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        ordersError: true
      }

    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      }
    case WS_AUTH_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        ordersUser: action.payload
      }
    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        ordersError: true
      }
    default:
      return state
  }
}