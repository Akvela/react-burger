import { TFeedOrders } from '../types/data';

export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';

export interface IWsConnectionSuccessAction {
  type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsGetMessageAction {
  type: typeof WS_GET_MESSAGE;
  payload: TFeedOrders;
}
export interface IWsConnectionStartAction {
  type: typeof WS_CONNECTION_START;
  payload: string;
}
export interface IWsConnectionClosedAction {
  type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionErrorAction {
  type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionCloseAction {
  type: typeof WS_CONNECTION_CLOSE;
}

export function connectionSuccess(): IWsConnectionSuccessAction {
  return { type: WS_CONNECTION_SUCCESS };
}
export function connectionGetMessage(payload: TFeedOrders): IWsGetMessageAction {
  return { type: WS_GET_MESSAGE, payload };
}
export function connectionStart(payload: string): IWsConnectionStartAction {
  return { type: WS_CONNECTION_START, payload };
}
export function connectionClosed(): IWsConnectionClosedAction {
  return { type: WS_CONNECTION_CLOSED };
}
export function connectionError(): IWsConnectionErrorAction {
  return { type: WS_CONNECTION_ERROR };
}
export function connectionClose(): IWsConnectionCloseAction {
  return { type: WS_CONNECTION_CLOSE };
}

export type TWsActions = 
  | IWsConnectionSuccessAction
  | IWsGetMessageAction
  | IWsConnectionStartAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsConnectionCloseAction;

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};