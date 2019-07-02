const AWS = require('aws-sdk');
const chromium = require('chrome-aws-lambda');
const puppeteer = chromium.puppeteer;

const CVBABY_HOST_CLIENT = process.env.CVBABY_HOST_CLIENT;
const CVBABY_HOST_DATA = process.env.CVBABY_HOST_DATA;
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
async function renderPDF({ slug, path }, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  await removeAllPDFs(path);
  const locales = [
    'en',
    'de'
  ];
  for (const locale of locales) {
    const url = `${CVBABY_HOST_CLIENT}/${locale === 'en' ? '' : locale + '/'}${slug}?headless=true`;
    const pdf = await renderHTMLtoPDF(url);
    const key = `${path}/resume_${locale}.pdf`;
    await S3.putObject({
      Bucket: CVBABY_HOST_DATA,
      Body: pdf,
      Key: key,
      ACL: 'public-read'
    }).promise();
  }

  return { statusCode: 200 };
}

async function renderHTMLtoPDF(url, locale) {
  const opts = {
    args: chromium.args.concat([`--lang=${locale}`]),
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  };
  const browser = await puppeteer.launch(opts);
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
    Bucket: CVBABY_HOST_DATA,
    Prefix: path
  }).promise();
  return await Promise.all(
    files.map(({ Key }) =>
      // Only delete PDF files.
      /\.pdf$/gi.test(Key)
        ? S3.deleteObject({ Bucket: CVBABY_HOST_DATA, Key }).promise()
        : Promise.resolve()
    )
  );
}
