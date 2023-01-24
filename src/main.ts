import proxies from "@/assets/proxy.json"
import {downloadDom} from "@/crawler/downloadDom.js";
import { Logger } from "@/logger/logger.js"
import {parseOmimClinicalSynopsis} from "@/parsers/parseOmimClinicalSynopsis.js";
import {parsersOMIMDisorders} from "@/parsers/parsersOMIMDisorders.js";
import {write} from "@/io/saveFile.js";
import { HttpProxy, ProxyService } from "@/proxyService/proxyService.js"

import omimItems from "../output/list_of_OMIM_disorder_codes.json"

const logger = new Logger('output/errors.log');

export async function parseOMIM(url: string, proxy?: HttpProxy) {
  const dom = await downloadDom(url, proxy);
  return parseOmimClinicalSynopsis(dom.window.document.body)
}

export async function parse_list_of_OMIM_disorder_codes() {
  const url = "https://en.wikipedia.org/wiki/List_of_OMIM_disorder_codes";
  const dom = await downloadDom(url);
  return parsersOMIMDisorders(dom.window.document.body);
}

export async function parse_list_of_omim(urls: string[]) {
  const proxyList: HttpProxy[] = proxies.hosts.map((host, index) => ({host, port: +proxies.ports[index]}))
  const proxyService = new ProxyService(proxyList)
  
  for (let url in urls) {
    try
    {
      await parseOMIM(url, proxyService.current())
    }
    catch (err) {
      const errMessage = `err: ${err.message}, proxy: ${proxyService.current()} url: ${url}`
      logger.appendError(errMessage)
      proxyService.next()
    }
  }
}

// parseOMIM('https://omim.org/clinicalSynopsis/162200').then(result => {
//   saveObject('162200.json', result)
// }).catch((err) => {
//   logger.appendError(err)
// })

const omimUrlList = omimItems.map(omimItem => omimItem.code).filter((code) => code.slice(0, 3) === '162')

console.log({ omimUrlList })

parse_list_of_omim([])

parse_list_of_OMIM_disorder_codes().then(result => {
  saveObject('list_of_OMIM_disorder_codes.json', result)
})

function saveObject(filename, obj: any){
  const result = JSON.stringify(obj, null, 1);
  // console.log(`${filename}`, result);
  write(`output/${filename}`,  result);
}
