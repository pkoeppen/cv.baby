const AWS = require('aws-sdk');
const sharp = require('sharp');

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});
const CVBABY_BUCKET_PRE = process.env.CVBABY_BUCKET_PRE;
const CVBABY_BUCKET_POST = process.env.CVBABY_BUCKET_POST;

module.exports = { ingest };

/*
 *  Pre-signup hook to automatically confirm users.
 */
async function ingest(event, context, callback) {
  for (const i in event.Records) {
    const { key: uploadKey } = event.Records[i].s3.object;
    try {
      if (/\/profile\.jpeg$/.test(uploadKey)) {
        await processImage(uploadKey);
        return callback({ statusCode: 200 });
      }
      throw new Error('Invalid upload key');
    } catch (error) {
      console.log('error:', JSON.stringify(error, null, 2));
      callback(JSON.stringify(error));
    }
  }
}

async function processImage(unprocessedKey) {
  const IMAGE_SIZE = [600, 600];
  // Get the unprocessed image file.
  const { Body: unprocessedImage } = await S3.getObject({
    Bucket: CVBABY_BUCKET_PRE,
    Key: unprocessedKey
  }).promise();
  // Sharpify the image.
  const processedImage = await sharp(unprocessedImage)
    .resize({
      width: IMAGE_SIZE[0],
      height: IMAGE_SIZE[1],
      fit: 'cover',
      position: sharp.strategy.entropy
    })
    .sharpen()
    .jpeg()
    .toBuffer();
  // Change the file extension to 'jpeg'.
  const processedKey = unprocessedKey.replace(/\.[a-z0-9]+$/gi, '.jpeg');
  // Put the processed image in the postprocess S3 bucket.
  console.log(`Putting buffer at key '${processedKey}'`);
  await S3.putObject({
    Bucket: CVBABY_BUCKET_POST,
    Body: processedImage,
    Key: processedKey,
    ACL: 'public-read'
  }).promise();
  // Delete the unprocessed image from the ingest S3 bucket.
  console.log(`Deleting key '${unprocessedKey}'`);
  await S3.deleteObject({
    Bucket: CVBABY_BUCKET_PRE,
    Key: unprocessedKey
  }).promise();
}
