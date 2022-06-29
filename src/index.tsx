import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './app.jsx';
import { rootReducer } from './services/reducers/index.js';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
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
