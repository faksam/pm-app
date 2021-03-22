// react libraries
import * as React from 'react';

// third party packages
import { BrowserRouter as Router, HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';

// components
import NavigationBar from '../components/navbar/NavigationBar';
import HomePage from '../pages/HomePage';
import Auth from '../components/auth/Auth';
import NewProduct from '../components/product/NewProduct';
import { decodeToken } from '../helpers/authorize';

const Routes = (props: any) => {
  console.log("Routes props");
  console.log(props);
  const { auth, signoutUser } = props;

  const decodedToken = decodeToken();
  console.log(decodedToken)
{/* <Route exact path="/">
  {auth.isAuthenticated ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */}
  return (
    <Router>
      <div className="container">
        <NavigationBar { ...{ auth: props.auth, signoutUser: props.signoutUser } } />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth">
          {auth.isAuthenticated ? <Redirect to="/" />  : <Auth />}
        </Route>
        <Route exact path="/products">
          {!auth.isAuthenticated ? <Redirect to="/auth" />  : <NewProduct />}
        </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
