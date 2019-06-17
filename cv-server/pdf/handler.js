const AWS = require('aws-sdk');
const puppeteer = require('puppeteer');

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});
const CVBABY_BUCKET_POST = process.env.CVBABY_BUCKET_POST;

module.exports = { renderPDF };

/*
 *  Processes base64 image strings with sharp.
 */
async function renderPDF(event, context, callback) {
  try {
    await S3.putObject({
      Bucket: CVBABY_BUCKET_POST,
      Body: processedImage,
      Key: keyUserImage,
      ACL: 'public-read'
    }).promise();
    return callback(null, { statusCode: 200 });
  } catch (error) {
    callback(error.message);
  }
}
