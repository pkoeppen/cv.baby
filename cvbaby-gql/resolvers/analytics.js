import iplocation from 'iplocation';
import { DynamoDB } from '../util';

const CVBABY_TABLE_ANALYTICS = process.env.CVBABY_TABLE_ANALYTICS;

export async function getAnalytics(resumeID) {
  const date = new Date();
  date.setDate(date.getDate() - 14);
  const twoWeeksAgo = date.getTime();
  const events = await DynamoDB.query({
    TableName: CVBABY_TABLE_ANALYTICS,
    KeyConditionExpression: `resumeID = :resumeID AND stamp > :twoWeeksAgo`,
    ExpressionAttributeValues: {
      ':resumeID': resumeID,
      ':twoWeeksAgo': twoWeeksAgo
    },
    ScanIndexForward: false
  })
    .promise()
    .then(({ Items }) => Items);
  const dates = {};
  events.map(event => {
    const d = new Date(event.stamp).toLocaleDateString();
    dates[d] = dates[d] ? dates[d].concat([event]) : [event];
  });
  return dates;
}

export async function submitAnalyticsEvent(resumeID, ipAddress) {
  // const { lat, lon, city, country } = await getIPLocation(ipAddress);
  getIPLocation(ipAddress);
  const city = 'Somewhereville';
  const country = 'USA';

  const event = {
    resumeID,
    stamp: Date.now(),
    // latitude: lat || null,
    // longitude: lon || null,
    latitude: (Math.random() * 100 - 50).toString(),
    longitude: (Math.random() * 100 - 50).toString(),
    city: city || null,
    country: country || null
  };
  await DynamoDB.put({
    TableName: CVBABY_TABLE_ANALYTICS,
    Item: event
  }).promise();
  return event;
}

function getIPLocation(ipAddress) {
  return new Promise((resolve, reject) => {
    iplocation(ipAddress, [], (error, res) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(res);
      }
    });
  });
}
