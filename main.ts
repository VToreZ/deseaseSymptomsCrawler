const Crawler = require('crawler')
const fs = require("fs")

// const obj = {}

function addSymptomsToFile(diseaseName, symptoms)
{
  const rawData = fs.readFileSync('data.json')
  const newData = JSON.stringify({ ...rawData, ...{ [diseaseName]: symptoms } })
  fs.writeFileSync('data.json', newData)
}

function getQueue() {
  const diseaseLinks = [];
  for (let i = 0; i <= 10000; i++) {
    diseaseLinks.push(`https://omim.org/clinicalSynopsis/${i}`);
  }
  return diseaseLinks;
}

const crawlerInstance = new Crawler({
  maxConnections: 10,
  callback      : (error, res, done) =>
  {
    const obj = {}
    
    if (error)
    {
    } else
    {
      const $ = res.$
      const diseaseName = $('#mimContent > div.container.hidden-print > div:nth-child(2) >' +
        ' div.col-lg-8.col-lg-pull-2.col-md-8.col-md-pull-2.col-sm-8.col-sm-pull-2.col-xs-12 > div:nth-child(1) >' +
        ' div:nth-child(4) > h3 > span').text().trim()
      
      if (!diseaseName) done();
      console.log(diseaseName)
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
      addSymptomsToFile(diseaseName, obj)
      console.log(obj)
      done()
    }
  }
})

crawlerInstance.queue(getQueue())
