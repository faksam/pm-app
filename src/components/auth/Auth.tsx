// import libraries
import * as React from 'react';

// third-party libraries
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserInputValidation from '../../helpers/authValidation';
import { signUpUser, signInUser } from '../../store/modules/auth';

// styles

// components
// import Carousel from 'react-material-ui-carousel';
import {
  Button,
  Container,
  TextField,
} from '@material-ui/core';

// interfaces
import { HomeProps, HomeState } from './interfaces';
import { User } from 'modules/users/interfaces';

export class HomePage extends React.Component<HomeProps, HomeState> {

  initialState = {
    displayFullAuth: false,
    errors: {
      userPhoneError: false,
      userEmailError: false,
      userAddressError: false,
      userNameError: false,
      userRegionError: false,
      userPasswordError: false,
      userConfirmPasswordError: false,
    },
    userPassword: '',
    userConfirmPassword: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userRegion: '',
    userName: '',
    userPhoneLabel: 'Phone',
    userPhoneHelperText: 'Please input your mobile no',
    userEmailLabel: 'Email',
    userEmailHelperText: 'Please input your e-mail address',
    userAddressLabel: 'Address',
    userAddressHelperText: 'Please input the delivery address',
    userNameLabel: 'Name',
    userNameHelperText: 'Please input your fullname',
    userRegionLabel: 'Region',
    userRegionHelperText: 'Please input your region',
    userPasswordLabel: 'Password',
    userPasswordHelperText: 'Please input your password',
    userConfirmPasswordLabel: 'Confirm Password',
    userConfirmPasswordHelperText: 'Please confirm your password',
  };

  state = this.initialState;

  componentDidMount() {
    // this.props.getFaceMasks();

  }


  onChange = (event) => {
    const { errors } = this.state;

    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  }

  authClick = (e) => {
    e.preventDefault();
    let isValid;
    const {
      displayFullAuth,
      userName,
      userAddress, 
      userPhone,
      userEmail,
      userPassword,
      userConfirmPassword,
      userRegion } = this.state;

    if(displayFullAuth) {
      isValid = UserInputValidation.signUpInputValidation({
        name: userName,
        phone: userPhone,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
        region: userRegion,
        address: userAddress,
      });
    } else {
      isValid = UserInputValidation.signInInputValidation({
      });
    }

    if(isValid && displayFullAuth) {
      const { signUpUser } = this.props;
      signUpUser({
        name: userName,
        phone: userPhone,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
        region: userRegion,
        address: userAddress,
      });
    } else if(isValid && !displayFullAuth) {
      const { signInUser } = this.props;
      signInUser({
        email: userEmail,
        password: userPassword,
      });
    }
    // window.location.href = "/";
  }

  displayFullAuthForm = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      displayFullAuth: !prevState.displayFullAuth
    }))
  }

  render() {
    const {
      displayFullAuth,
      userName,
      userAddress, 
      userPhone,
      userEmail,
      userPassword,
      userConfirmPassword,
      userRegion,
      errors,
      userAddressHelperText,
      userAddressLabel,
      userEmailHelperText,
      userEmailLabel,
      userNameHelperText,
      userNameLabel,
      userPhoneHelperText,
      userPhoneLabel,
      userRegionLabel,
      userRegionHelperText,
      userPasswordLabel,
      userPasswordHelperText,
      userConfirmPasswordLabel,
      userConfirmPasswordHelperText,
    } = this.state;

    return (
      <div className="home-page">
        <Container maxWidth="md">

        <TextField
            id="filled-select-currency"
            error={errors.userEmailError}
            label={userEmailLabel}
            helperText={userEmailHelperText}
            name="userEmail"
            value={userEmail}
            onChange={this.onChange}
            placeholder="Email"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            id="filled-select-currency"
            error={errors.userPasswordError}
            label={userPasswordLabel}
            helperText={userPasswordHelperText}
            name="userPassword"
            value={userPassword}
            onChange={this.onChange}
            placeholder="Password"
            fullWidth
            required={true}
          ></TextField>
          {displayFullAuth ?
          (
          <div><TextField
            error={errors.userConfirmPasswordError}
            id="filled-select-currency"
            label={userConfirmPasswordLabel}
            helperText={userConfirmPasswordHelperText}
            name="userConfirmPassword"
            value={userConfirmPassword}
            onChange={this.onChange}
            placeholder="Confirm Password"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            id="filled-select-currency"
            error={errors.userNameError}
            label={userNameLabel}
            helperText={userNameHelperText}
            name="userName"
            value={userName}
            onChange={this.onChange}
            placeholder="Full Name"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            id="filled-select-currency"
            error={errors.userPhoneError}
            label={userPhoneLabel}
            helperText={userPhoneHelperText}
            name="userPhone"
            value={userPhone}
            onChange={this.onChange}
            placeholder="Phone No"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            error={errors.userRegionError}
            id="filled-select-currency"
            label={userRegionLabel}
            helperText={userRegionHelperText}
            name="userRegion"
            value={userRegion}
            onChange={this.onChange}
            placeholder="City/Region"
            fullWidth
            required={true}
          ></TextField>
          <TextField
            error={errors.userAddressError}
            id="filled-select-currency"
            label={userAddressLabel}
            helperText={userAddressHelperText}
            name="userAddress"
            value={userAddress}
            onChange={this.onChange}
            placeholder="Address"
            fullWidth
            required={true}
          ></TextField></div>)
          : null
          }
          <Button color="primary" size="medium" onClick={this.authClick}>{displayFullAuth? `Register` : `Login`}</Button>
          <Button color="default" size="small" onClick={this.displayFullAuthForm} style={{float: "right"}}>{displayFullAuth? `Login Form` : `Register Form`}</Button>
          
        </Container>
      </div>
    );
  }
}

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = dispatch => ({
  signInUser: (user: User) => dispatch(signInUser(user)),
  signUpUser: (user: User) => dispatch(signUpUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
