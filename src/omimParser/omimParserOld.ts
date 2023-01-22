import { createCrawlerInstance, ONSuccess } from "@/customCrawler.js"
import { append, write } from "@/saveFile.js"

function onError(e: Error)
{
  console.log(e)
}

const onSucces: ONSuccess = (res) =>
{
  console.log({ options: res.options.filename })
  const obj = {}
  const { fileName } = res.options
  const $ = res.$
  const diseaseName = $('#mimContent > div.container.hidden-print > div:nth-child(2) >' +
    ' div.col-lg-8.col-lg-pull-2.col-md-8.col-md-pull-2.col-sm-8.col-sm-pull-2.col-xs-12 > div:nth-child(1) >' +
    ' div:nth-child(4) > h3 > span').text().trim()
  console.log({ fileName })
  setTimeout(() => {
    write(fileName, '')
  }, 2000)
  write(fileName, '')
  
  if (!diseaseName) return
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
  // addSymptomsToFile(diseaseName, obj)
  if (fileName)
  {
    append(fileName, JSON.stringify(obj))
  }
  console.log(obj)
}

const customCrawlerInstance = createCrawlerInstance(onSucces, onError)

type Props = {
  ids: string[]
}

export function parseOmim({ ids }: Props)
{
  const queue = ids.map(id => ({
    uri: `https://omim.org/clinicalSynopsis/${ id }`,
    // options: {
    filename: `./outputs/${ id }.json`
    // }
  }))
  
  customCrawlerInstance.queue(queue)
}


