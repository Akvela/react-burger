import { WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START } from "../actions/ws";

const initialState = {
  wsRequest: false,
  wsOpen: false,
  wsFailed: false,
  orders: [],
  total: '',
  totalToday: ''
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsRequest: true
      };
    }

    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsRequest: false,
        wsOpen: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsRequest: false,
        wsOpen: false,
        wsFailed: true
      }
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsRequest: false,
        wsOpen: false,
        wsFailed: false,
        orders: [],
        total: '',
        totalToday: ''
      }
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    }


    default: {
      return state;
    }
  }
};
