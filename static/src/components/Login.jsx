/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Paper, Button, TextField } from '@material-ui/core';

import * as actionCreators from '../actions/auth';
import { validateEmail } from '../utils/misc';

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

const MIN_PASSWORD_LENGTH = 6;

const Login = ({loginUser, statusText}) => {
  const [loginState, setLoginState] = React.useState({
    email: '',
    password: '',
    emailErrorText: '',
    passwordErrorText: '',
    validEmail: false,
    validPassword: false,
  });
  const { email, password, emailErrorText, passwordErrorText, validEmail, validPassword } = loginState;

  const redirectTo = '/login';

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    if (newEmail === ''){
      setLoginState({
        ...loginState,
        email: newEmail,
        emailErrorText: '',
        validEmail: false,
      });
    } else if (validateEmail(newEmail)) {
      setLoginState({
        ...loginState,
        email: newEmail,
        emailErrorText: '',
        validEmail: true,
      });
    } else {
      setLoginState({
        ...loginState,
        email: newEmail,
        emailErrorText: 'Sorry, this is not a valid email',
        validEmail: false,
      });
    }
  }

  const changePassword = (e) => {
    const newPassword = e.target.value;
    if (newPassword === '' || !newPassword) {
      setLoginState({
        ...loginState,
        password: newPassword,
        passwordErrorText: '',
        validPassword: false,
      });
    } else if (newPassword.length >= MIN_PASSWORD_LENGTH) {
      setLoginState({
        ...loginState,
        password: newPassword,
        passwordErrorText: '',
        validPassword: true,
      });
    } else {
      setLoginState({
        ...loginState,
        password: newPassword,
        passwordErrorText: `Your password must be at least ${MIN_PASSWORD_LENGTH}`,
        validPassword: false,
      });

    }
  }
  const login = (e) => {
    e.preventDefault();
    loginUser(email, password, redirectTo);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (validEmail && validPassword) {
        login(e);
      }
    }
  }
  return (
    <div onKeyPress={handleKeyPress}>
      <Paper style={style}>
        <form role="form">
          <div className="text-center">
            <h2>Login to view protected content!</h2>
            {
              statusText &&
                <div className="alert alert-info">
                  {statusText}
                </div>
            }

            <div>
              <TextField
                label="Email"
                type="email"
                error={!!emailErrorText}
                helperText={emailErrorText}
                onChange={changeEmail}
              />
            </div>
            <div>
              <TextField
                label="Password"
                type="password"
                error={!!passwordErrorText}
                helperText={passwordErrorText}
                onChange={changePassword}
              />
            </div>

            <Button
              variant='contained'
              disabled={! (validPassword && validEmail)}
              style={{ marginTop: 50 }}
              onClick={login}
            >
              Submit 
            </Button>

          </div>
        </form>
      </Paper>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);