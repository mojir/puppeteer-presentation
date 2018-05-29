const puppeteer = require('puppeteer')

async function cgiSearch() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200
  })
  const page = await browser.newPage()

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

  // $$eval will do magic stuff
  const result = await page.$$eval(
    // The result of this selector will be passed into
    // the function running in the browser
    searchResultLink,

    // This function will run in the browser
    links => {
      // Find all links that has the word CAREER
      const linksThatHasCAREER =
        links.filter(link => link.textContent.match(/CAREER/))

      // Return the first link
      return linksThatHasCAREER[0]
    }
  )

  if (!result) {
    throw Error('Did not found expected search result')
  }

  await browser.close()
}

module.exports = cgiSearch
