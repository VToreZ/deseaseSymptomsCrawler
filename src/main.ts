import {downloadDom} from "@/crawler/downloadDom.js";
import {parseOmimClinicalSynopsis} from "@/parsers/parseOmimClinicalSynopsis.js";
import {parsersOMIMDisorders} from "@/parsers/parsersOMIMDisorders.js";
import {write} from "@/io/saveFile.js";

export async function parseOMIM(url: string) {
  const dom = await downloadDom(url);
  return parseOmimClinicalSynopsis(dom.window.document.body)
}
export async function parse_list_of_OMIM_disorder_codes() {
  const url = "https://en.wikipedia.org/wiki/List_of_OMIM_disorder_codes";
  const dom = await downloadDom(url);
  return parsersOMIMDisorders(dom.window.document.body);
}

parseOMIM('https://omim.org/clinicalSynopsis/162200').then(result => {
  saveObject('162200.json', result)
})

parse_list_of_OMIM_disorder_codes().then(result => {
  saveObject('list_of_OMIM_disorder_codes.json', result)
})

function saveObject(filename, obj: any){
  const result = JSON.stringify(obj, null, 1);
  // console.log(`${filename}`, result);
  write(`output/${filename}`,  result);
}
