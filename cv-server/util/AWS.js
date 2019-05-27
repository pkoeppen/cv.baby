import * as AWS from 'aws-sdk';
import * as AWS from 'amazon-dax-client';

AWS.config.update({	region: "us-east-1" });

export const DynamoDB = new AWS.DynamoDB.DocumentClient();
export const S3 = new AWS.S3({
  apiVersion: "2006-03-01",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  endpoint: "https://s3.amazonaws.com"
});
export const SES = new AWS.SES({apiVersion: "2010-12-01"});

// const DAXClient = new AmazonDAXClient({
//   endpoints: ["xxxxxxx.clustercfg.dax.use1.cache.amazonaws.com:8111"],
//   region: "us-east-1"
// });

// const DAX = new AWS.DynamoDB.DocumentClient({
//   service: DAXClient
// });