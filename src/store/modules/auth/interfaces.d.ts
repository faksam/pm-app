// interfaces
import { AuthUserRole } from 'modules/authUserRoles/interfaces';

// types
import {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  SET_CURRENT_USER_FAIL,
  SET_CURRENT_USER_ERROR,
  SIGNOUT_USER
} from './types';

export interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  authUserRole: AuthUserRole;
  createdAt: string | Moment;
}

export interface CurrentUserSuccess {
  type: SET_CURRENT_USER,
  user: AuthUser;
}

export interface CurrentUserError {
  type: AUTH_USER_ERROR,
  error
}

export interface SignoutCurrentUserSuccess {
  type: SIGNOUT_USER
}
