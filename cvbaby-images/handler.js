const AWS = require('aws-sdk');
const sharp = require('sharp');

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});

const IS_OFFLINE = process.env.IS_OFFLINE;
const CVBABY_HOST_DATA = process.env.CVBABY_HOST_DATA;

module.exports = { processImage };

/*
 *  Processes base64 image strings with sharp.
 */
async function processImage({ userID, resumeID, base64Image }, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (IS_OFFLINE) {
    const fs = require('fs');
    const file = fs.readFileSync('./image');
    base64Image = new Buffer(file).toString('base64');
  }
  await processBase64Image(userID, resumeID, base64Image);
  return { statusCode: 200 };
}

async function processBase64Image(userID, resumeID, base64Image) {
  const IMAGE_SIZE = [600, 600];
  const imageBuffer = Buffer.from(base64Image, 'base64');

  // Sharpify the image.
  const processedImage = await sharp(imageBuffer)
    .resize({
      width: IMAGE_SIZE[0],
      height: IMAGE_SIZE[1],
      fit: 'cover',
      position: sharp.strategy.entropy
    })
    .sharpen()
    .jpeg()
    .toBuffer();

  // Put the processed image in the post-process S3 bucket.
  const keyResumeImage = `users/${userID}/${resumeID}/profile.jpeg`;
  const keyUserImage = `users/${userID}/profile.jpeg`;

  console.log(`Putting buffer at key '${keyResumeImage}'`);
  await S3.putObject({
    Bucket: CVBABY_HOST_DATA,
    Body: processedImage,
    Key: keyResumeImage,
    ACL: 'public-read'
  }).promise();

  console.log(`Putting buffer at key '${keyUserImage}'`);
  await S3.putObject({
    Bucket: CVBABY_HOST_DATA,
    Body: processedImage,
    Key: keyUserImage,
    ACL: 'public-read'
  }).promise();
}
