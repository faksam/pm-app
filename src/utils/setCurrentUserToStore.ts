import * as Cookie from 'cookies-js';
import * as jwt from 'jwt-simple';
import { setCurrentUser } from '../store/modules/auth/index';
// import * as dotenv from 'dotenv';

// dotenv.config();

const setCurrentUserToStore = (store) => {
  const token = Cookie.get('jwtToken');
  console.log(token);
  if (token) {
    console.log(process.env.SECRET_TOKEN);
    const decodedToken = jwt.decode(token, 'LifeIsARace');
    try {
      const isExpired = (decodedToken.exp < (Date.now() / 1000));
      if (!isExpired) {
        console.log(decodedToken);
        store.dispatch(setCurrentUser({data: decodedToken, token}));
      } else {
        //store.dispatch(signoutUser());
      }
    } catch (err) {
      //store.dispatch(signoutUser());
    }
  }
};

export default setCurrentUserToStore;
