import axios from 'axios';
import jose from 'node-jose';
import find from 'lodash/find';

const AWS_REGION = 'us-east-1';
const AWS_COGNITO_USER_POOL_ID = process.env.CVBABY_USER_POOL_ID;
const AWS_ISSUER = `https://cognito-idp.${AWS_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`;
const AWS_KEYS_URL = `${AWS_ISSUER}/.well-known/jwks.json`;

function generatePolicy(claims, effect, resource) {
  const authResponse = {};
  authResponse.principalId = claims.username;

  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
}

export const authorizer = event => {
  const token = event.authorizationToken;

  if (!token) {
    return new Error('Unauthorized');
  }

  const sections = token.split('.');
  const header = jose.util.base64url.decode(sections[0]);
  const { kid } = JSON.parse(header);

  // Get .well-known keys.
  return axios
    .get(AWS_KEYS_URL)
    .then(response => {
      if (response.status === 200 && response.data.keys) {
        // Find the correct key.
        const key = find(response.data.keys, _key => _key.kid === kid);
        // Verify the given token.
        return jose.JWK.asKey(key).then(result =>
          jose.JWS.createVerify(result)
            .verify(token)
            .then(data => {
              // Token is valid; check if expired.
              const claims = JSON.parse(data.payload);
              const timestamp = Math.floor(new Date() / 1000);
              if (timestamp > claims.exp) {
                throw new Error('Token is expired');
              } else if (claims.iss !== AWS_ISSUER) {
                throw new Error('Token issuer invalid');
              }
              // Verification succeeded.
              return generatePolicy(claims, 'Allow', event.methodArn);
            })
            .catch(error => {
              console.error(error);
              return new Error('Signature verification failed');
            })
        );
      }
      return new Error('Unauthorized');
    })
    .catch(() => {
      return new Error('Unauthorized');
    });
};
