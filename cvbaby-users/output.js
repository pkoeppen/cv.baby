const fs = require('fs');

module.exports = { handler };

function handler(data, serverless, { stage }) {
  updateConfig(`../cvbaby-client/config.${stage}.json`, data);
  updateConfig(`../cvbaby-gql/config.${stage}.json`, data);
  if (stage === 'dev') {
    updateConfig('../cvbaby-client/config.local.json', data);
    updateConfig('../cvbaby-gql/config.local.json', data);
  }
}

function updateConfig(configFilePath, data) {
  const config = require(configFilePath);
  config.CVBABY_USER_POOL_ID = data.UserPoolId;
  config.CVBABY_USER_POOL_CLIENT_ID = data.UserPoolClientId;
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}
