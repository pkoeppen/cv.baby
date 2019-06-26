import { DynamoDB } from '../util';

const CVBABY_TABLE_ANALYTICS = process.env.CVBABY_TABLE_ANALYTICS;

export async function getAnalytics(resumeID) {
  const events = await DynamoDB.query({
    TableName: CVBABY_TABLE_ANALYTICS,
    KeyConditionExpression: 'resumeID = :resumeID',
    ExpressionAttributeValues: { ':resumeID': resumeID }
  })
    .promise()
    .then(({ Items }) => Items);
  return events;
}

export async function submitAnalyticsEvent(ipAddress, timestamp) {
  const event = {
    timestamp,
    latitude,
    longitude
  };
  await DynamoDB.put({
    TableName: CVBABY_TABLE_ANALYTICS,
    Item: event
  }).promise();
  return event;
}
