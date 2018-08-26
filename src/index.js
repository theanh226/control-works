import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux'

// Create Store 
import {
    createStore
} from 'redux';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render( 
    <Provider store={store}>
    <App />
  </Provider>,  document.getElementById('root'));
registerServiceWorker();