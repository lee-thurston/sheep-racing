import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import twitchReducer from './reducers/twitch.reducer';
import { createStore } from 'redux'

import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer)

  return store
}

const store = configureStore(twitchReducer)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
