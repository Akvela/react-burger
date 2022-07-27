import { getOrderNumber } from '../../utils/api';
import { TOrder } from '../types/data';
import { AppThunk, AppDispatch } from '../types';

export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

export interface IOpenModalOrderAction {
  readonly type: typeof OPEN_MODAL_ORDER;
}
export interface ICloseModalOrderAction {
  readonly type: typeof CLOSE_MODAL_ORDER;
}
export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;
  readonly orderSuccessed: boolean;
  readonly order: TOrder;
}
export interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR;
}

export type TOrderDetailsActions = 
  | IOpenModalOrderAction
  | ICloseModalOrderAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction;

export const getUserOrderNumber: AppThunk = ({ accessToken, order }) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST })
    getOrderNumber(accessToken, order)
      .then(res => {
        dispatch({ type: GET_ORDER_SUCCESS, orderNumber: res.order.number, order: res.order, orderSuccessed: res.success })
      })
      .catch(err => { dispatch({ type: GET_ORDER_ERROR }) })
  }
}