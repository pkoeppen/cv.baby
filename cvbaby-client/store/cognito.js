import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CookieStorage
} from 'amazon-cognito-identity-js';
import * as cookie from 'cookie';

/* eslint-disable */
const CVBABY_ENV = process.env.CVBABY_ENV;
const AWS_COGNITO_USER_POOL_ID = process.env.CVBABY_USER_POOL_ID;
const AWS_COGNITO_CLIENT_ID = process.env.CVBABY_USER_POOL_CLIENT_ID;
/* eslint-enable */

const storage = new CookieStorage({
  domain: 'localhost',
  secure: CVBABY_ENV === 'prod'
});
const pool = new CognitoUserPool({
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
  Storage: storage
});

export const state = () => ({
  authenticating: false,
  authenticated: null,
  accessToken: null,
  userID: null,
  email: null
});

export const actions = {
  /* Called by nuxtServerInit() in index.js. */
  serverInit(context, request) {
    if (request && request.headers.cookie) {
      const parsed = cookie.parse(request.headers.cookie);
      const usernameField = `CognitoIdentityServiceProvider.${AWS_COGNITO_CLIENT_ID}.LastAuthUser`;
      if (!parsed[usernameField]) {
        return;
      }
      const username = parsed[usernameField].replace('@', '%40');
      const accessTokenField = `CognitoIdentityServiceProvider.${AWS_COGNITO_CLIENT_ID}.${username}.accessToken`;
      const accessToken = parsed[accessTokenField];
      if (!accessToken) {
        return;
      }
      const user = {
        username: username,
        signInUserSession: {
          accessToken: {
            jwtToken: accessToken,
            payload: {}
          }
        }
      };
      context.commit('setAuthenticated', user);
    }
  },

  /* Fetch access token from state. */
  getAccessToken({ state }) {
    return state.accessToken;
  },

  /* Check if authenticated. */
  checkAuthentication(context) {
    return new Promise((resolve, reject) => {
      context.commit('setAuthenticating', true);
      const user = pool.getCurrentUser();
      if (!user) {
        context.commit('setAuthenticating', false);
        context.commit('setAuthenticated', null);
        context.commit('setUserID', null);
        context.commit('setEmail', null);
        resolve(false);
      } else {
        user.getSession((error, session) => {
          context.commit('setAuthenticating', false);
          if (error) {
            context.commit('setAuthenticated', null);
            context.commit('setUserID', null);
            context.commit('setEmail', null);
            reject(error);
          } else {
            context.commit('setAuthenticated', user);
            context.commit(
              'setUserID',
              user.signInUserSession.accessToken.payload.sub
            );
            context.commit('setEmail', user.username);
            context.commit('setAccessToken', session.accessToken);
            resolve(session);
          }
        });
      }
    });
  },

  /* Authenticate user and establish session. */
  authenticateUser(context, { email, password, newPassword }) {
    return new Promise((resolve, reject) => {
      context.commit('setAuthenticating', true);
      const user = new CognitoUser({
        Username: email,
        Pool: pool,
        Storage: storage
      });
      user.authenticateUser(
        new AuthenticationDetails({
          Username: email,
          Password: password
        }),
        {
          onFailure(error) {
            context.commit('setAuthenticating', false);
            reject(error);
          },
          onSuccess(session) {
            context.commit('setAuthenticating', false);
            context.commit('setAuthenticated', user);
            context.commit(
              'setUserID',
              user.signInUserSession.accessToken.payload.sub
            );
            context.commit('setEmail', user.username);
            context.commit('setAccessToken', session.accessToken);
            resolve(session);
          },
          newPasswordRequired(userAttributes) {
            context.commit('setAuthenticating', false);
            // eslint-disable-next-line no-param-reassign
            delete userAttributes.email_verified; // Immutable field
            user.completeNewPasswordChallenge(
              newPassword,
              userAttributes,
              this
            );
          }
        }
      );
    });
  },

  /* Get user session from storage. */
  getUserSession() {
    return new Promise((resolve, reject) => {
      const user = pool.getCurrentUser();
      if (user !== null) {
        user.getSession((error, session) => {
          if (error) {
            reject(error);
          } else {
            resolve(session);
          }
        });
      } else {
        resolve();
      }
    });
  },

  /* Fetch attributes of the authenticated user. */
  getUserAttributes(context) {
    return new Promise((resolve, reject) => {
      const user = pool.getCurrentUser();
      if (user == null) {
        resolve();
      } else {
        user.getSession(error0 => {
          if (error0) {
            reject(error0);
          } else {
            user.getUserAttributes((error1, result) => {
              if (error1) {
                reject(error1);
              } else {
                const attributes = {};
                result.forEach(attribute => {
                  attributes[attribute.getName()] = attribute.getValue();
                });
                context.commit('setAttributes', attributes);
                resolve(attributes);
              }
            });
          }
        });
      }
    });
  },

  /* Change password of the currently authenticated user (given the current and new password). */
  changePassword(context, { currentPassword, newPassword }) {
    return new Promise((resolve, reject) => {
      const user = pool.getCurrentUser();
      if (user == null) {
        reject(new Error('Unauthenticated'));
      } else {
        user.getSession(error0 => {
          if (error0) {
            reject(error0);
          } else {
            user.changePassword(
              currentPassword,
              newPassword,
              (error1, result) => {
                if (error1) {
                  reject(error1);
                } else {
                  resolve(result);
                }
              }
            );
          }
        });
      }
    });
  },

  /* Initiate lost password procedure (send verification code to user). */
  forgotPassword(context, { email }) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: pool,
        Storage: storage
      });
      user.forgotPassword({
        onSuccess(result) {
          resolve(result);
        },
        onFailure(error) {
          reject(error);
        }
      });
    });
  },

  /* Confirm a new password for a given email, verification code, and new password. */
  confirmPassword(context, { email, verificationCode, newPassword }) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: pool,
        Storage: storage
      });
      user.confirmPassword(verificationCode, newPassword, {
        onSuccess(result) {
          resolve(result);
        },
        onFailure(error) {
          reject(error);
        }
      });
    });
  },

  /* Sign up a new user for a given email and password (then send verification code). */
  signUp(context, { email, password, attributesList }) {
    return new Promise((resolve, reject) => {
      const attributes = [];
      if (attributesList) {
        Object.entries(attributesList).forEach(entry => {
          attributes.push(
            new CognitoUserAttribute({
              Name: entry[0],
              Value: entry[1]
            })
          );
        });
      }
      attributes.push(
        new CognitoUserAttribute({
          Name: 'email',
          Value: email
        })
      );
      pool.signUp(email, password, attributes, null, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const { user } = result;
          resolve(user);
        }
      });
    });
  },

  /* Confirm registration for a given email and verification code. */
  confirmRegistration(context, { email, verificationCode }) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: pool,
        Storage: storage
      });
      user.confirmRegistration(verificationCode, true, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  /* Re-send the registration verification code. */
  resendConfirmationCode(context, { email }) {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: pool
      });
      user.resendConfirmationCode((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  /* Sign out user. */
  signOut(context) {
    const user = pool.getCurrentUser();
    if (user !== null) {
      user.signOut();
      context.commit('setAuthenticated', null);
      context.commit('setUserID', null);
      context.commit('setEmail', null);
    }
  }
};

export const mutations = {
  setAuthenticating(_state, authenticating) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticating = authenticating;
  },
  setAuthenticated(_state, payload) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticated = payload;
  },
  setUserID(_state, userID) {
    _state.userID = userID;
  },
  setEmail(_state, email) {
    _state.email = email;
  },
  setAttributes(_state, attributes) {
    // eslint-disable-next-line no-param-reassign
    _state.authenticated = {
      ..._state.authenticated,
      attributes
    };
  },
  setAccessToken(_state, accessToken) {
    // eslint-disable-next-line no-param-reassign
    _state.accessToken = accessToken;
  }
};
