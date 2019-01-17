const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www-test.fgrid.io/')
  .type('#uName', '19958164614')
  .type('#pas', '123456')
  // .click('#search_button_homepage')
  // .wait('#r1-0 a.result__a')
  // .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  // .end()
  // .then(console.log)
  // .catch(error => {
  //   console.error('Search failed:', error)
  // })