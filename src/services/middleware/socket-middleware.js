import {  WS_CONNECTION_CLOSED,  WS_SEND_MESSAGE} from '../actions/orders';
import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions, isAuth) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsSuccess, wsError, wsMessage, wsClose } = wsActions;
      const accessToken = isAuth && getCookie('token')
      
      if (type === wsStart) {
        socket = isAuth ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsSuccess, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = event => {
          const data = JSON.parse(event.data)
          dispatch({ type: wsMessage, payload: data });
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose) {
          socket.close()
        }
      }

      next(action);
    };
  };
}