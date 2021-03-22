import axios from 'axios';
import urlConfig from '../../../urlConfig';
import * as Cookie from 'cookies-js';
import * as jwt from 'jwt-simple';

// types
import {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  SET_CURRENT_USER_FAIL,
  SET_CURRENT_USER_ERROR,
  SIGNOUT_USER
} from './types';


export const setCurrentUser = action => ({
  type: SET_CURRENT_USER,
  user: action.data,
  token: action.token,
});

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_ERROR,
  error
});

export const signoutCurrentUser = () => ({
  type: SIGNOUT_USER
});


export const signInUser = userDetails => dispatch => { 

  axios.post(
  `${urlConfig.apiUrl}/auth/login`, userDetails, urlConfig.options
)
  .then((response) => {
    Cookie.set('jwtToken', response.data.token);
    dispatch(setCurrentUser(response.data));
  })
  .catch((error) => {
    dispatch(setCurrentUserError(error.response.data));
  });
}

export const signoutUser = () => (dispatch) => {
  Cookie.expire('jwtToken');
  dispatch(signoutCurrentUser());
};

/**
 * Thunk
 *
 * SignUp a new user thunk
 *
 * @param {Object} userDetails
 *
 * @returns {Funciton}
 */
export const signUpUser = userDetails => dispatch => { 

  axios.post(
  `${urlConfig.apiUrl}/auth/signup`, userDetails, urlConfig.options
)
  .then((response) => {
    Cookie.set('jwtToken', response.data.token);
    dispatch(setCurrentUser(response.data));
  })
  .catch((error) => {
    dispatch(setCurrentUserError(error.response));
  });
}


// Set the initial role state
const initialState = {
  isAuthenticated: false,
  user: {},
  token: '',
  error: {},
  errors: {}
};

/**
 * Redux reducer for Auth User actions
 *
 * This reducer changes the auth state of the application
 *
 * @param {AuthUserState} state Reducer initial state
 * @param {Action} action
 *
 * @returns {AuthUserState} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token,
        error: {},
        errors: {}
      };
    case SET_CURRENT_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: '',
        error: action.error,
        errors: {},
      };
    case SET_CURRENT_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: '',
        error: action.error,
        errors: {}
      };
    case SIGN_UP_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: '',
        error: action.error,
        errors: {}
      };
    case SIGNOUT_USER:
      return {
        ...state,
        ...initialState
      };
    default: return state;
  }
};
