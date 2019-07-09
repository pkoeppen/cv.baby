const fs = require('fs');
// const AWS = require('aws-sdk');

module.exports = { handler };

async function handler(data, serverless, { stage }) {
  // Update config files.
  updateConfig(`../cvbaby-client/config.${stage}.json`, data);
  updateConfig(`../cvbaby-gql/config.${stage}.json`, data);
  if (stage === 'dev') {
    updateConfig('../cvbaby-client/config.local.json', data);
    updateConfig('../cvbaby-gql/config.local.json', data);
  }
  // Add custom attributes to user pool.
  // await addCustomAttributes(data);
}

function updateConfig(configFilePath, data) {
  const config = require(configFilePath);
  config.CVBABY_USER_POOL_ID = data.UserPoolId;
  config.CVBABY_USER_POOL_CLIENT_ID = data.UserPoolClientId;
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

// function addCustomAttributes(data) {
//   const params = {
//     UserPoolId: data.UserPoolId,
//     CustomAttributes: [
//       {
//         Name: 'trialStarted',
//         AttributeDataType: 'Number',
//         DeveloperOnlyAttribute: false,
//         Mutable: true,
//         Required: true
//       }
//     ]
//   };
//   return AWS.request(
//     'CognitoIdentityServiceProvider',
//     'addCustomAttributes',
//     params
//   );
// }
