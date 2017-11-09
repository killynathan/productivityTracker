import { createStore } from 'redux';

import reducer from './modules/reducer';

const myCreateStore = () => {
  // const store = createStore(reducer);
  // return store;

  let store;
  let initialState = (JSON.parse(window.localStorage.getItem('productivityTracker')));
  if (initialState) store = createStore(reducer, initialState);
  else store = createStore(reducer);
  return store;

}

export default myCreateStore;
