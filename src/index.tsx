import * as React from 'react';
import * as ReactDOM from 'react-dom';

// third party packages
import { Provider } from 'react-redux';

// components
import App from './App';

import store from './store';

import setAuthorizationToken from './utils/authorization';
import setCurrentUserToStore from './utils/setCurrentUserToStore';

setAuthorizationToken();
setCurrentUserToStore(store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
