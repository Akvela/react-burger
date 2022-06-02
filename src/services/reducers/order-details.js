import {OPEN_MODAL_ORDER, CLOSE_MODAL_ORDER, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from '../actions/order-details.js';

const initialState = {
  orderRequest: false,
  orderIsClicked: false,
  orderSuccessed: false,
  orderFailed: false,
  orderNumber: null,
  order: {}
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER:
      return { ...state, orderIsClicked: true }
    case CLOSE_MODAL_ORDER:
      return {
        ...state,
        orderRequest: false,
        orderIsClicked: false,
        orderSuccessed: false,
        orderFailed: false,
        orderNumber: null,
        order: {}
      }
    case GET_ORDER_REQUEST:
      return { ...state, orderRequest: true }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderSuccessed: action.result,
        orderNumber: action.data,
        order: action.orderData,
      }
    case GET_ORDER_ERROR:
      return {
        ...state,
        orderFailure: true,
        orderNumber: null,
      }
    default:
      return state
  }
}