import {
  CREATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_USERS_SUCCESS,
  USERS_ERROR,
} from './types';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address: string;
  region: string;
}

export interface GetUsersSuccess {
  users: User[];
  type: GET_USERS_SUCCESS;
}

export interface GetUserSuccess {
  user: User;
  type: GET_USER_SUCCESS;
}

export interface UsersError {
  error,
  type: USERS_ERROR;
}

export interface CreateUserSuccess {
  type: CREATE_USER_SUCCESS;
  user: User;
}

export interface EditUserSuccess {
  user: User;
  type: EDIT_USER_SUCCESS;
}

export interface DeleteUserSuccess {
  id: string;
  type: DELETE_USER_SUCCESS;
}
