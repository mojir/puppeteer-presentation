const puppeteer = require('puppeteer')

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://malmo.se/')
  await page.screenshot({path: 'malmo_se.png'})
  await browser.close()
}

takeScreenshot()