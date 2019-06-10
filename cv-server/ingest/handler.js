const AWS = require('aws-sdk');
const sharp = require('sharp');

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});
const CVBABY_BUCKET_POST = process.env.CVBABY_BUCKET_POST;

module.exports = { processImage };

/*
 *  Processes base64 image strings with sharp.
 */
async function processImage(event, context, callback) {
  try {
    await processBase64Image(event);
    return callback(null, { statusCode: 200 });
  } catch (error) {
    callback(error.message);
  }
}

async function processBase64Image({ userID, resumeID, base64Image }) {
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
    Bucket: CVBABY_BUCKET_POST,
    Body: processedImage,
    Key: keyResumeImage,
    ACL: 'public-read'
  }).promise();
  console.log(`Putting buffer at key '${keyUserImage}'`);
  await S3.putObject({
    Bucket: CVBABY_BUCKET_POST,
    Body: processedImage,
    Key: keyUserImage,
    ACL: 'public-read'
  }).promise();
}
