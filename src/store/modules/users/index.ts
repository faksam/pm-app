import axios from 'axios';
import urlConfig from '../../../urlConfig';

// interfaces
import {
  User,
  GetUserSuccess,
  UsersError,
  GetUsersSuccess,
  EditUserSuccess,
  CreateUserSuccess,
  DeleteUserSuccess
} from './interfaces';

// types
import {
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  USERS_ERROR,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
} from './types';


/**
 * action creator
 *
 * Create users success action creator
 *
 * @param {User} user
 *
 * @returns {CreateUserSuccess}
 */

export const createUserSuccess = (user: User): CreateUserSuccess => ({
  user,
  type: CREATE_USER_SUCCESS,
});

/**
 * action creator
 *
 * Get user success action creator
 *
 * @param {User[]} user
 *
 * @returns {GetUsersSuccess}
 */
export const getUsersSuccess = (data: User[]): GetUsersSuccess => ({
  users: data,
  type: GET_USERS_SUCCESS,
});


export const userError = (error): UsersError => ({
    type: USERS_ERROR,
    error
  });
/**
 * action creator
 *
 * Get an user success action creator
 *
 * @param {User} user
 *
 * @returns {GetUserSuccess}
 */
export const getUserSuccess = (data: User): GetUserSuccess => ({
  user: data,
  type: GET_USER_SUCCESS,
});

/**
 * action creator
 *
 * Delete specific user success action creator
 *
 * @param {User} user
 *
 * @returns {DeleteUserSuccess}
 */
export const deleteUserSuccess = (userId: string): DeleteUserSuccess => ({
  id: userId,
  type: DELETE_USER_SUCCESS,
});

/**
 * action creator
 *
 * Update user success action creator
 *
 * @param {User} user
 *
 * @returns {EditUserSuccess}
 */
export const editUserSuccess = (user: User): EditUserSuccess => ({
  user,
  type: EDIT_USER_SUCCESS,
});

/**
 * Thunk
 *
 * Create user thunk
 *
 * @param {Object} user
 *
 * @returns {Function}
 */
export const createUser = (user: User) => dispatch => axios.post(
  `${urlConfig.apiUrl}/users/`, { user }
)
  .then((response) => {
    dispatch(createUserSuccess(response.data));
  })
  .catch(error =>
    dispatch(userError({
      status: error.response.status,
      data: error.response.data
    }))
  );

/**
 * Thunk
 *
 * Delete user thunk
 *
 * @param {string} userId
 *
 * @returns {Function}
 */
export const deleteUser = userId => dispatch => axios.delete(
  `${urlConfig.apiUrl}/users/${userId}`
)
  .then(() => {
    dispatch(deleteUserSuccess(userId));
  })
  .catch((error) =>
    dispatch(userError({
      status: error.response.status,
      data: error.response.data
    }))
  );

  /**
 * Thunk
 *
 * Delete user thunk
 *
 * @param {string} userId
 *
 * @returns {Function}
 */
export const getUser = userId => dispatch => axios.get(
  `${urlConfig.apiUrl}/users/${userId}`
)
  .then((response) => {
    
    dispatch(getUserSuccess(response.data.data));
  })
  .catch((error) =>
    dispatch(userError({
      status: error.response.status,
      data: error.response.data
    }))
  );

/**
 * Thunk
 *
 * Get users thunk
 *
 * @returns {Function}
 */
export const getUsers = () => dispatch => {
  
  return axios.get(
  `${urlConfig.apiUrl}/users`
)
  .then(response => {
    
    return dispatch(getUsersSuccess(response.data.data))
  })
  .catch((error) =>
    dispatch(userError({
      status: error.response.status,
      data: error.response.data
    }))
  );
}

/**
 * Thunk
 *
 * Edit an user thunk
 *
 * @param {string} userId
 * @param {Object} updatedRolePayload
 *
 * @returns {Funciton}
 */
export const editUser = (user: User) => dispatch => axios.patch(
  `${urlConfig.apiUrl}/users/${user.id}`, {user}
)
  .then((response) => {
    dispatch(getUserSuccess(response.data.data));
  })
  .catch((error) =>
    dispatch(userError({
      status: error.response.status,
      data: error.response.data
    }))
  );

// Set the initial user state
const userInitialState = {
  data: [],
  meta: {},
  errors: {},
  isLoading: false
};

/**
 * Redux reducer for User Role actions
 *
 * This reducer changes the user state of the application
 *
 * @param {UserState} state Reducer initial state
 * @param {Action} action
 *
 * @returns {UserState} new state
 */
const reducer = (state = userInitialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        data: [action.user, ...state.data],
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        data: state.data.map(user =>
          user.id === action.user.id ? action.user : user),
      };
    case DELETE_USER_SUCCESS:
      const updatedUserList = state.data.filter(user => user.id !== action.userId);
      return {
        ...state,
        data: updatedUserList,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.users,
        meta: action.meta,
        isLoading: action.isLoading,
      };
    case USERS_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default reducer;
