import { getOrderNumber } from '../../utils/api';

export const OPEN_MODAL_ORDER = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER = 'CLOSE_MODAL_ORDER';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export function getUserOrderNumber(idData, token, refresh, callback) {
  return function(dispatch) {
    dispatch({ type: GET_ORDER_REQUEST })
    getOrderNumber(idData, token, refresh, callback)
      .then(res => {
        dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number, orderData: res, result: res.success })
      })
      .catch(err => { dispatch({ type: GET_ORDER_ERROR }) })
  }
}