import { getOrderNumber } from '../../utils/api';
import { TOrder } from '../types/data';
import { AppThunk } from '../types';

export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

export interface IOpenModalOrderAction {
  type: typeof OPEN_MODAL_ORDER;
}
export interface ICloseModalOrderAction {
  type: typeof CLOSE_MODAL_ORDER;
}
export interface IGetOrderRequestAction {
  type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  type: typeof GET_ORDER_SUCCESS;
  orderNumber: number;
  order: TOrder;
  orderSuccessed: boolean;
}
export interface IGetOrderErrorAction {
  type: typeof GET_ORDER_ERROR;
}

export function openModalOrder(): IOpenModalOrderAction {
  return { type: OPEN_MODAL_ORDER };
}
export function closeOrderModal(): ICloseModalOrderAction {
  return { type: CLOSE_MODAL_ORDER };
}
export function getOrderRequest(): IGetOrderRequestAction {
  return { type: GET_ORDER_REQUEST };
}
export function getOrderSuccess(orderNumber: number, order: TOrder, orderSuccessed: boolean): IGetOrderSuccessAction {
  return { type: GET_ORDER_SUCCESS, orderNumber, order, orderSuccessed };
}
export function getOrderError(): IGetOrderErrorAction {
  return { type: GET_ORDER_ERROR };
}

export type TOrderDetailsActions = 
  | IOpenModalOrderAction
  | ICloseModalOrderAction
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderErrorAction;

export const getUserOrderNumber = ({ accessToken, order }: { accessToken: string; order: string[] }): AppThunk => (dispatch) => {
  dispatch(getOrderRequest())
  return getOrderNumber(accessToken, order)
    .then(res => {
      dispatch(getOrderSuccess(res.order.number, res.order, res.success))
    })
    .catch(err => { dispatch(getOrderError()) })
}