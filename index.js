const puppeteer = require('puppeteer')

const WIDTH = 1600
const HEIGHT = 1200

malmoSkola()
  .then(() => console.log("Done"))
  .catch(error => console.error(error))



async function malmoSkola() {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100,
    // args: [
    //   `--window-size=${WIDTH},${HEIGHT}`
    // ],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT })

  await page.goto('https://malmo.se/')

  // Locate the search input and enter some text
  const searchInput = 'input[name="q"]'
  await page.waitForSelector(searchInput)
  await page.type(searchInput, 'Djupadalsskolan')

  // Click the search button
  const searchButton = 'input[type="submit"]'
  await page.click(searchButton)

  // Wait for search results to show
  const resultsSection = 'section[class="results"]'
  await page.waitForSelector(resultsSection)

  // Click on the first result
  await page.click(`${resultsSection} ol li h2 a`)

  // Wait for page to load and klick on "Klassernas egna sidor"
  const classesOwnPagesLink = 'a[href="/Forskola--utbildning/Grundskola/Grundskolor-och-forskoleklass/Grundskolor/Djupadalsskolan/Klassernas-egna-sidor.html"]'
  await page.waitForSelector(classesOwnPagesLink)
  await page.click(classesOwnPagesLink)

  // Wait for page to load and klick on link with text "Åk. 2"
  const theTable = 'table[class="sv-table-striped c1021"]'
  await page.waitForSelector(theTable)
  await page.$$eval('a', links => links.find(link => link.textContent.includes('Åk. 2')).click())

  // Wait for page to load and click on "Läxor" link
  await page.waitForSelector('div[id="sites-canvas"]')
  await page.$$eval('a', links => links.find(link => link.textContent.includes('Läxor')).click())

  // Wait for page to load and take a screenshot
  await page.waitForSelector('span[id="sites-page-title"]')
  await page.screenshot({path: 'target/homework.png'})

  await browser.close()
}