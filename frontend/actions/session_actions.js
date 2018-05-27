import * as APIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER ';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS ';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER ';


//pojo actions
export const receieveCurrentUser = (currentUser) => {
  return({
    type: RECEIVE_CURRENT_USER,
    currentUser
  })
};

export const logoutCurrentUser = () => {
  return({
    type: LOGOUT_CURRENT_USER
  })
};

export const receieveErrors = (errors) => {
  return({
    type: RECEIVE_SESSION_ERRORS,
    errors
  })
};

//thunks
export const signup = user => dispatch => (
  APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ))
);

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => dispatch(logoutCurrentUser(user)))
)
