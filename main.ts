const Crawler = require('crawler')

const obj = {}
const crawlerInstance = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) =>
  {
    if (error)
    {
      console.log(error)
    } else
    {
      const $ = res.$
      const organSystemContainer =
        $('#mimClinicalSynopsis > div ')
      organSystemContainer.each(function (index, element)
      {
        const title = $(this).find('div:nth-child(1) > span > strong').text().trim()
        // let symptoms = $(this).find('div[style="margin-left: 2em;"]').find('span.mim-font').text().replace('\n', '').replace(/[\(\[\{].*[\)\]\}]/g, '').replace(/-/g, '').trim();
        const symptomsIterator = $(this).find('div[style="margin-left: 2em;"]').find('span.mim-font').text().replace('\n', '').matchAll(/- ((?:\w|\d|\s|\(|\)|\.|,)*) (?:\[|$)/g)//.replace(/[\(\[\{].*[\)\]\}]/g, '').replace(/-/g, '').trim();
        const symptoms = Array.from(symptomsIterator).map(group => group[1].trim())
        if (title != '')
        {
          obj[title] = symptoms
        }
      })
    }
    console.log(obj)
    done()
  }
})

crawlerInstance.queue('https://omim.org/clinicalSynopsis/162200')
