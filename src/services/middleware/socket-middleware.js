export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;
      
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      
      if (type === wsClose) {
        console.log('соединение закрыто2')
        socket.close()
      }

      if (socket) {
        socket.onopen = event => {
          console.log('соединение открыто')
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log('произошла ошибка')
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          console.log('пришло сообщение')
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          
          if (restParsedData.hasOwnProperty('orders')) {
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = event => {
          console.log('соединение закрыто1')
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
}