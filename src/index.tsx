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
import { wsActions } from './services/actions/ws'
import './index.css';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
export const store = createStore(rootReducer, enhancer); 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename='/react-burger'>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
