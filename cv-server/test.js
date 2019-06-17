const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/de/george?headless=true', {
    waitUntil: 'networkidle2'
  });
  await page.emulateMedia('screen');
  const height = await page.evaluate(
    () => document.documentElement.offsetHeight
  );
  await page.pdf({
    path: 'george.pdf',
    printBackground: true,
    height: `${height}px`
  });

  await browser.close();
})();
