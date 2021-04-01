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
  Grid,
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
    console.log(this.props)
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

    if (displayFullAuth) {
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
        email: userEmail,
        password: userPassword,
      });
    }

    if (isValid == true && displayFullAuth) {
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
    } else if (isValid == true && !displayFullAuth) {
      const { signInUser } = this.props;
      signInUser({
        email: userEmail,
        password: userPassword,
      });
    }
    else {
      if (displayFullAuth) {
        this.setState({
          userPasswordHelperText: (isValid.error.password ? isValid.error.password[0] : 'Please input your password'),
          userRegionHelperText: (isValid.error.region ? isValid.error.region[0] : 'Please input your region'),
          userNameHelperText: (isValid.error.name ? isValid.error.name[0] : 'Please input your fullname'),
          userAddressHelperText: (isValid.error.address ? isValid.error.address[0] : 'Please input the delivery address'),
          userEmailHelperText: (isValid.error.email ? isValid.error.email[0] : 'Please input your e-mail address'),
          userConfirmPasswordHelperText: (isValid.error.password_confirmation ? isValid.error.password_confirmation[0] : 'Please confirm your password'),
          errors: {
            userPasswordError: (isValid.error.password ? true : false),
            userRegionError: (isValid.error.region ? true : false),
            userNameError: (isValid.error.name ? true : false),
            userAddressError: (isValid.error.address ? true : false),
            userEmailError: (isValid.error.email ? true : false),
            userConfirmPasswordError: (isValid.error.password_confirmation ? true : false),
          },
        });
      } else {
        this.setState({
          userPasswordHelperText: (isValid.error.password ? isValid.error.password[0] : 'Please input your password'),
          userEmailHelperText: (isValid.error.email ? isValid.error.email[0] : 'Please input your e-mail address'),
          errors: {
            userPasswordError: (isValid.error.password ? true : false),
            userEmailError: (isValid.error.email ? true : false),
          },
        });
      }
    }
  }

  displayFullAuthForm = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      displayFullAuth: !prevState.displayFullAuth,
      userEmailHelperText: 'Please input your e-mail address',
      userAddressHelperText: 'Please input the delivery address',
      userNameHelperText: 'Please input your fullname',
      userRegionHelperText: 'Please input your region',
      userPasswordHelperText: 'Please input your password',
      userConfirmPasswordHelperText: 'Please confirm your password',
      errors: {
        userPhoneError: false,
        userEmailError: false,
        userAddressError: false,
        userNameError: false,
        userRegionError: false,
        userPasswordError: false,
        userConfirmPasswordError: false,
      },
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
          <Grid item xs={12} sm={12} md={6} lg={6} style={{paddingTop: "40px", marginRight: "auto", marginLeft: "auto"}}>
            <h2>{displayFullAuth ? `Register` : `Login`}</h2>
            <TextField
              id="filled-email"
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
              id="filled-password"
              type="password"
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
                  id="filled-ConfirmPassword"
                  type="password"
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
                    id="filled-name"
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
                    id="filled-phone"
                    error={errors.userPhoneError}
                    label={userPhoneLabel}
                    helperText={userPhoneHelperText}
                    name="userPhone"
                    value={userPhone}
                    onChange={this.onChange}
                    placeholder="Phone No"
                    fullWidth
                    required={false}
                  ></TextField>
                  <TextField
                    error={errors.userRegionError}
                    id="filled-region"
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
                    id="filled-address"
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
            <Button color="primary" size="medium" onClick={this.authClick}>{displayFullAuth ? `Register` : `Login`}</Button>
            <Button color="default" size="small" onClick={this.displayFullAuthForm} style={{ float: "right" }}>{displayFullAuth ? `Login Form` : `Register Form`}</Button>
          </Grid>
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
