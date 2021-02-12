import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import authReducer from './store/reducers/auth'

const store = createStore(authReducer)

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

