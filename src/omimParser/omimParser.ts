import axios from "axios"
import { JSDOM } from "jsdom"
import * as console from "console";

type Props = {
  ids: string[]
}

function parseClinicalSynopsis(body: HTMLElement){
  // Удаляем мусорные теги
  body.querySelectorAll(".hidden").forEach(value => value.remove())
  body.querySelectorAll("a").forEach(value => value.remove())
  // -----
  const blocks = [...body.querySelectorAll("#mimClinicalSynopsis > div:not([id])")]
  return blocks.map(parseSynopsisBlock);
}

function parseSynopsisBlock(block: HTMLElement){
  const caption = block.querySelector('strong')?.textContent.trim()
  const symptomsBlock = block.querySelector('[style="margin-left: 2em;"]');

  if(!symptomsBlock){
    // Почему-то тут иногда undefined
    return undefined;
  }
  /// Ищем блоки с подзаголовками вроде Head и Eyes
  const symptomsSubBlocks = symptomsBlock.children
  const symptoms = symptomsSubBlocks.length > 0 ? [...symptomsSubBlocks]: [symptomsBlock];
  //

  return {
    caption, // HEAD & NECK
    description: symptoms.map(parseSymptoms)
  };
}


function parseSymptomsList(symptomsListString: string) {
  return symptomsListString.trim()
      .replaceAll('- ', '')
      .split('\n')
      .map(value => value.trim())
}

function parseSymptoms(block: HTMLElement){
  const dislocation = block.querySelector('em')?.textContent.trim()
  const symptoms = [...block.querySelectorAll('span.mim-font:not(.h5)')]
      .flatMap(value => parseSymptomsList(value.textContent))

  return {
    dislocation, // "Head", "Eyes"
    symptoms
  };
}

export async function parseOmim({ ids }: Props)
{
  const url = 'https://omim.org/clinicalSynopsis/162200'
  fetchData(url).then((res) =>
  {
    if (!res) return
    const html = res.data
    const dom = new JSDOM(html)
    const result = parseClinicalSynopsis(dom.window.document.body);

    console.log('result', JSON.stringify(result, null, 1));

  })
}


async function fetchData(url)
{
  console.log("Crawling data...")
  // make http call to url
  const response = await axios(url).catch((err) => console.error(err))
  if (!response) return

  if (response.status !== 200)
  {
    console.log("Error occurred while fetching data")
    return
  }
  return response
}
