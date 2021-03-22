import { combineReducers } from 'redux';

// reducers
import auth from './modules/auth';
import products from './modules/products';
import users from './modules/users';

// types

const appReducer = combineReducers({
  auth,
  products,
  users,
});

const rootReducer = (state, action) => {
  switch (action.type) {

  }

  return appReducer(state, action);
};

export default rootReducer;
