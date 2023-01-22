import axios from "axios"
import * as cheerio from "cheerio"

type Props = {
  ids: string[]
}

export async function parseOmim({ ids }: Props)
{
  // console.log('sdsds')
  // const res = await axios.get(
  //   'https://omim.org/clinicalSynopsis/162200'
  // )
  const url = 'https://omim.org/clinicalSynopsis/162200'
  const obj = {}
  
  fetchData(url).then((res) =>
  {
    if (!res) return
    const html = res.data
    const $ = cheerio.load(html)
    
    const block = $('#mimClinicalSynopsis > div:not([id])')
    
    block.each((index, element) =>
    {
      
      const dislocation = $(element).find('[style="margin-left: 2em;"]').first().text().replace('\n', '')
      //const text = $(element).find('div[style="margin-left: 2em;"]').text().trim().replaceAll('- ',
      // '').split('\n')//.filter(e => e.trim() !== '')
      
      console.log({ dislocation })
    })
    
    
    
    // [...$.querySelectorAll('#mimClinicalSynopsis > div:not([id])')].map(block => [...block.querySelectorAll('span.mim-font')]).map(value => value.map(v => v.outerText))
    
  })
  
  
  // console.log([...res.data.querySelectorAll('#mimClinicalSynopsis > div:not([id])')])//.map(block =>
  // [...block.querySelectorAll('span.mim-font')]).map(value => value.map(v => v.outerText)))
  
}


async function fetchData(url)
{
  console.log("Crawling data...")
  // make http call to url
  let response = await axios(url).catch((err) => console.log(err))
  if (!response) return
  
  if (response.status !== 200)
  {
    console.log("Error occurred while fetching data")
    return
  }
  return response
}
