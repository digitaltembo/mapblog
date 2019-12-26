import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';
import moment from 'moment';


const TOKEN_EXPIRATION = 5; // hours

function expiredAuthentication(authTime) {
  // return true if authTime < (now-expiration time)
  return authTime?.isBefore == null || authTime.isBefore(moment().subtract(TOKEN_EXPIRATION, 'hours'))
}

const DetermineAuth = ({token, authTime, whenUnauthorized, validateToken, children}) => {
  const finalToken = token || localStorage.getItem('token') || '';
  if (token == null) {
    if (finalToken != '') {
      validateToken(finalToken);
    }
  } else if (expiredAuthentication(authTime)) {
    validateToken(finalToken);
  }
  if (finalToken === '' && whenUnauthorized != null) {
    return whenUnauthorized;
  } else {
    return children;
  }
};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    authTime: state.auth.authTime,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ConnectedDetermineAuth = connect(mapStateToProps, mapDispatchToProps)(DetermineAuth);

export default ConnectedDetermineAuth;