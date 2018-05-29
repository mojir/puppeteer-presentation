const cgiSearch = require('./cgiSearch')

describe('CGI search', () => {
  jest.setTimeout(30000)
  it('Should find CAREER', async () => {
    await cgiSearch()
  })
})
