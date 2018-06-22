import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createReducer from 'redux-base/createReducer';
import defaultState from './states';

const loggerMiddleware = createLogger({
  collapsed: true,
  level: 'info',
  stateTransformer({ series, seasons }) {
    return { series, seasons };
  },
  actionTransformer(action) {
    return { type: `${action.type}_${action.status || ''}` };
  },
});

const reducer = createReducer(defaultState);

const middleware = [
  thunkMiddleware,
  loggerMiddleware,
].filter(Boolean);

export default function create(initialState) {
  const store = createStore(
    reducer,
    initialState || defaultState,
    applyMiddleware(...middleware));

  store.dispatchAll = function dispatchAll(actions) {
    return Promise.all(actions.map(action => store.dispatch(action())));
  };

  store.dispatchEach = async function dispatchEach(actions) {
    for (const action of actions) {
      await store.dispatch(action());
    }
  };

  return store;
}

