const AWS = require('aws-sdk');
const puppeteer = require('chrome-aws-lambda').puppeteer;

const CVBABY_CLIENT_HOST = process.env.CVBABY_CLIENT_HOST;
const CVBABY_BUCKET_POST = process.env.CVBABY_BUCKET_POST;
const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
  endpoint: 'https://s3.amazonaws.com'
});

module.exports = { renderPDF };

/*
 *  Renders an HTML resume page to PDF and saves it to S3.
 */
async function renderPDF({ slug, alias, path }, context, callback) {
  try {
    // TODO: Render in multiple languages
    const pdf = await renderHTMLtoPDF(`${CVBABY_CLIENT_HOST}/${slug}`);
    const key = `${path}/${alias}.pdf`;
    await removeAllPDFs(path);
    await S3.putObject({
      Bucket: CVBABY_BUCKET_POST,
      Body: pdf,
      Key: key,
      ACL: 'public-read'
    }).promise();
    callback(null, { statusCode: 200 });
  } catch (error) {
    callback(error.message);
  }
}

async function renderHTMLtoPDF(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.emulateMedia('screen');
  const height = await page.evaluate(
    () => document.documentElement.offsetHeight
  );
  const pdf = await page.pdf({
    printBackground: true,
    height: `${height}px`
  });
  await browser.close();
  return pdf;
}

async function removeAllPDFs(path) {
  const { Contents: files } = await S3.listObjects({
    Bucket: CVBABY_BUCKET_POST,
    Prefix: path
  }).promise();
  return await Promise.all(
    files.map(({ Key }) =>
      // Only delete PDF files.
      /\.pdf$/gi.test(Key)
        ? S3.deleteObject({ Bucket, Key }).promise()
        : Promise.resolve()
    )
  );
}
