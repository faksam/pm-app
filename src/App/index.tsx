import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// Import Materialize
// import * as M from 'materialize-css';

// components
import Routes from '../routes';

import { signoutUser } from '../store/modules/auth';

// interfaces
import { AppProps, AppState } from './interfaces';

class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    // Auto initialize all the things Materialize!
    // M.AutoInit();
  }

  render() {
    return (
      <Routes {...this.props}/>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export const mapDispatchToProps = dispatch => ({
  signoutUser: () => dispatch(signoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
