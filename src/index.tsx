import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './components/app/app.jsx';
import { rootReducer } from './services/reducers/index.js';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware';
import './index.css';
import { WS_AUTH_CONNECTION_ERROR, WS_AUTH_CONNECTION_SUCCESS, WS_AUTH_CONNECTION_GET_MESSAGE, WS_AUTH_CONNECTION_START,  WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE,  WS_CONNECTION_CLOSED } from './services/actions/orders'

const wsAllFeedActions = {
  wsStart: WS_CONNECTION_START,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsError: WS_CONNECTION_ERROR,
  wsMessage: WS_GET_MESSAGE,
  wsClose: WS_CONNECTION_CLOSED
}

const wsUserFeedActions = {
  wsStart: WS_AUTH_CONNECTION_START,
  wsSuccess: WS_AUTH_CONNECTION_SUCCESS,
  wsError: WS_AUTH_CONNECTION_ERROR,
  wsMessage: WS_AUTH_CONNECTION_GET_MESSAGE,
  wsClose:  WS_CONNECTION_CLOSED
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware('wss://norma.nomoreparties.space/orders', wsAllFeedActions), 
  socketMiddleware('wss://norma.nomoreparties.space/orders', wsUserFeedActions, true) ));
const store = createStore(rootReducer, enhancer); 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
