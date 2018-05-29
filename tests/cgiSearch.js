const puppeteer = require('puppeteer')

const WIDTH = 1600
const HEIGHT = 1200

async function cgiSearch() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT })

  await page.goto('https://www.cgi.com/en')

  // Locate the search input and enter some text
  const searchInput = 'input[placeholder="SEARCH"]'
  await page.waitForSelector(searchInput)
  await page.type(searchInput, 'CAREER')
  await page.keyboard.press('Enter')

  // Wait for search results to show
  const searchResults = 'div[id="block-current-search-standard"]'
  await page.waitForSelector(searchResults)

  // Take a screenshot
  await page.screenshot({path: 'CGI-search.png'})

  // Let's make sure the 'CAREER' search result is visible
  const searchResultLink = 'div[id="block-system-main"] a'
  const result = await page.$$eval(searchResultLink, links => {
    return links.filter(link => link.textContent.match(/CAREER/))[0]
  })

  if (!result) {
    throw Error('Did not found expected search result')
  }

  await browser.close()
}

module.exports = cgiSearch
