// import {
//   CognitoUser,
//   CognitoUserPool,
// } from 'amazon-cognito-identity-js';
// import cookie from 'cookie';

/* eslint-disable */
// const AWS_COGNITO_CLIENT_ID = process.env.AWS_COGNITO_CLIENT_ID;
// const AWS_COGNITO_USER_POOL_ID = process.env.AWS_COGNITO_USER_POOL_ID;
/* eslint-enable */

// const pool = new CognitoUserPool({
//   UserPoolId: AWS_COGNITO_USER_POOL_ID,
//   ClientId: AWS_COGNITO_CLIENT_ID,
// });

export const state = () => ({});

export const actions = {
  // async nuxtServerInit(context, { req }) {
  //   if (req && req.headers.cookie) {
  //     const parsed = cookie.parse(req.headers.cookie);
  //     const user = new CognitoUser({
  //       Username: parsed[`CognitoIdentityServiceProvider.${AWS_COGNITO_CLIENT_ID}.LastAuthUser`],
  //       Pool: pool,
  //     });
  //     await new Promise((resolve, reject) => {
  //       user.getSession((error, session) => {
  //         if (error) {
  //           context.commit('setAuthenticated', null);
  //           reject(error);
  //         } else {
  //           context.commit('setAuthenticated', user);
  //           resolve(session);
  //         }
  //       });
  //     });
  //   }
  // },
};

export const mutations = {};
