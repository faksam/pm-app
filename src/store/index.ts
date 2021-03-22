import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const devMiddleware = composeWithDevTools(
  applyMiddleware(
    thunk,
    reduxImmutableStateInvariant()
  )
);
const prodMiddleware = applyMiddleware(thunk);

const middleware = process.env.NODE_ENV === 'development' ?
  devMiddleware : prodMiddleware;

const store = createStore(
  rootReducer,
  {},
  middleware
);

export default store;
