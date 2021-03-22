import { NextFunction, Request, Response } from 'express';
// import Validator from 'validatorjs';
const Validator = require('validatorjs');

/**
 * @class UserInputValidation
 */
export default class UserInputValidation {
  /**
   * validate user input on signIn
   *
   * @param {object} formInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static signInInputValidation(formBody) {
    const {
      email, password,
    } = formBody;

    const validation = new Validator(
      {
        email,
        password,
      },
      {
        email: 'required|string|email',
        password: 'required|min:8|max:40',
      }
    );

    console.log('validation.passes()');
    console.log('validation.passes(email, password)');
    console.log(email, password);
    console.log(validation.passes());
    if (validation.passes()) {
      return true;
    } else {
      const errors = validation.errors.all();
      return {
        success: false,
        status: 400,
        error: errors,
      };
    }
  }

  /**
   * validate user input on signUp
   *
   * @param {object} formInput
   *
   * @returns {boolean} true
   * @returns {object} errors
   */
  static signUpInputValidation(formBody) {
    const {
      name, email, password, confirmPassword, phone, address, region,
    } = formBody;

    const validation = new Validator(
      {
        name,
        phone: phone,
        email,
        password,
        password_confirmation: confirmPassword,
        region,
        address,
      },
      {
        name: 'required|string|min:2|max:40',
        region: 'required|string|min:2|max:40',
        email: 'required|string|email',
        password: 'required|min:8|max:40|confirmed',
        password_confirmation: 'required',
        phone: 'string|max:40',
        address: 'required|string|max:100',
      }
    );

    if (validation.passes()) {
      return true;
    } else {
      const errors = validation.errors.all();
      return {
        success: false,
        status: 400,
        error: errors,
      };
    }
  }
}

