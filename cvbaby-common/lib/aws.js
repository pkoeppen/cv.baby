import { createLogger } from './logger';
import * as AWS from 'aws-sdk';

const logger = createLogger('AWS');
AWS.config.update({ region: 'us-east-1' });

export const Lambda = new AWS.Lambda({
  apiVersion: '2015-03-31',
  region: 'us-east-1'
});
export const DynamoDB = new AWS.DynamoDB.DocumentClient();
export const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});
export const SES = new AWS.SES({ apiVersion: '2010-12-01' });
export const Cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18'
});

export function invokeLambda(functionName, payload) {
  logger.debug(
    `Invoking lambda function '${functionName}' with payload '${payload}'`,
    { fn: 'invokeLambda' }
  );
  return new Promise((resolve, reject) => {
    Lambda.invoke(
      {
        FunctionName: functionName,
        Payload: payload,
        InvocationType: 'Event'
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  }).catch(error => {
    logger.error(error, { fn: 'invokeLambda' });
  });
}

export function getDatabaseItem(table, key) {
  logger.debug(`Getting database item from table '${table}'`, {
    fn: 'getDatabaseItem'
  });
  return DynamoDB.get({
    TableName: table,
    Key: key
  })
    .promise()
    .then(({ Item }) => Item)
    .catch(error => {
      logger.error(error, { fn: 'getDatabaseItem' });
      throw error;
    });
}

export function queryDatabaseItems(table, expression, values) {
  logger.debug(
    `Querying database items from table '${table}' with expression '${expression}'`,
    { fn: 'queryDatabaseItems' }
  );
  return DynamoDB.query({
    TableName: table,
    KeyConditionExpression: expression,
    ExpressionAttributeValues: values
  })
    .promise()
    .then(({ Items }) => Items)
    .catch(error => {
      logger.error(error, { fn: 'queryDatabaseItems' });
      throw error;
    });
}

export function putDatabaseItem(table, item) {
  logger.debug(`Putting database item on table '${table}'`, {
    fn: 'putDatabaseItem'
  });
  return DynamoDB.put({
    TableName: table,
    Item: item,
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .catch(error => {
      logger.error(error, { fn: 'putDatabaseItem' });
      throw error;
    });
}

export function deleteDatabaseItem(table, key) {
  logger.debug(`Deleting database item on table '${table}'`, {
    fn: 'deleteDatabaseItem'
  });
  return DynamoDB.delete({
    TableName: table,
    Key: key
  })
    .promise()
    .catch(error => {
      logger.error(error, { fn: 'deleteDatabaseItem' });
      throw error;
    });
}

// import * as AmazonDAXClient from 'amazon-dax-client';
// const DAXClient = new AmazonDAXClient({
//   endpoints: ["xxxxxxx.clustercfg.dax.use1.cache.amazonaws.com:8111"],
//   region: "us-east-1"
// });

// const DAX = new AWS.DynamoDB.DocumentClient({
//   service: DAXClient
// });
