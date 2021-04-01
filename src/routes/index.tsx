// react libraries
import * as React from 'react';

// third party packages
import { BrowserRouter as Router, HashRouter, Link, matchPath, Redirect, Route, Switch } from 'react-router-dom';

// components
import NavigationBar from '../components/navbar/NavigationBar';
import HomePage from '../pages/HomePage';
import Auth from '../components/auth/Auth';
import NewProduct from '../components/product/NewProduct';
import ProductDetails from '../components/product/ProductDetails';
import { decodeToken } from '../helpers/authorize';

const Routes = (props: any) => {
  const { auth, signoutUser } = props;

  const decodedToken = decodeToken();
  
  return (
    <Router>
      <div className="container">
        <NavigationBar { ...{ auth: props.auth, signoutUser: props.signoutUser } } />
        <Switch>
        <Route exact path="/" component={HomePage}  {...{auth: props.auth}}/>
        <Route exact path="/auth">
          {auth.isAuthenticated ? <Redirect to="/" />  : <Auth />}
        </Route>
        <Route exact path="/products">
          {!auth.isAuthenticated ? <Redirect to="/auth" />  : <NewProduct />}
        </Route>
        {auth.isAuthenticated ? <Route exact path="/products/:id" component={ProductDetails} /> : <Redirect to="/auth" />}

        {/* <Route exact path="/products/:id">
          {!auth.isAuthenticated ? <Redirect to="/auth" />  : <ProductDetails />}
        </Route> */}
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
