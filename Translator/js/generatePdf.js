const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set your HTML content here
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Your Local Portfolio</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Your Portfolio</h1>
    <p>This is your portfolio content.</p>
    <script src="script.js"></script>
  </body>
  </html>
  `;

  await page.setContent(htmlContent);

  // Generate a PDF
  await page.pdf({ path: 'portfolio.pdf', format: 'A4' });

  await browser.close();
})();
