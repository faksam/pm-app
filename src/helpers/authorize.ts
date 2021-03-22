import * as jwt from 'jwt-simple';
import * as Cookie from 'cookies-js';

/**
 * @description - Decode user token if token is valid
 *
 * @param {*} userToken the token parameter passed with HTTP request.headers.authorization
 * @returns {boolean||object} false if token is invalid and token object if token is valid
 */
export const decodeToken = () => {
  const userToken = Cookie.get('jwtToken');
  const error = {message: {}};
  let decode;
  if (userToken && userToken.split(' ')[0] === 'Bearer') {
    const authHeader = userToken.split(' ');
    try {
      decode = jwt.decode(authHeader[1], 'LifeIsARace');
    } catch (err) {
      error.message = err;
    }
  }
  if (decode === '') {
    return false;
  }
  return decode;
};
