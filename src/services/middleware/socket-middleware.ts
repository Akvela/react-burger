import { AnyAction, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsUrl: string, wsActions: {[key in any]: any}) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (T: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      
      if (type === wsClose) {
        socket?.close()
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
}