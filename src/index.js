import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './redux/create';
import App from './components/App';

const store = createStore();

// import { addEntry, incrementCompletedSessions } from './redux/modules/entries';
//
// store.dispatch(addEntry("1-5-8"));
// store.dispatch(incrementCompletedSessions());
// store.dispatch(addEntry("7-7-7"));
// store.dispatch(incrementCompletedSessions());
// store.dispatch(incrementCompletedSessions());
// store.dispatch(incrementCompletedSessions());
// console.log(store.getState());

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
