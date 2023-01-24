import * as fs from "fs"
import {downloadDom} from "@/crawler/downloadDom.js";
import {parseOmimClinicalSynopsis} from "@/parsers/parseOmimClinicalSynopsis.js";
import {parsersOMIMDisorders} from "@/parsers/parsersOMIMDisorders.js";

function addSymptomsToFile(diseaseName, symptoms)
{
  const rawData = fs.readFileSync('data.json')
  const newData = JSON.stringify({ ...rawData, ...{ [diseaseName]: symptoms } })
  fs.writeFileSync('data.json', newData)
}

const ids = ['162200']
g
export async function parseOmim(url: string) {
  const dom = await downloadDom(url);
  return parseOmimClinicalSynopsis(dom.window.document.body)
}
export async function parse_list_of_OMIM_disorder_codes() {
  const dom = await downloadDom("https://en.wikipedia.org/wiki/List_of_OMIM_disorder_codes");
  return parsersOMIMDisorders(dom.window.document.body);
}

parseOmim('https://omim.org/clinicalSynopsis/162200').then(result => {
  console.log('result', JSON.stringify(result, null, 1));
})

parse_list_of_OMIM_disorder_codes().then(result => {
  console.log('result', JSON.stringify(result, null, 1));
})
