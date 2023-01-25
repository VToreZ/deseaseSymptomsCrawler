import proxies from "@/assets/proxy.json" assert { type: 'json' }
import {downloadDom} from "@/crawler/downloadDom.js";
import { Logger } from "@/logger/logger.js"
import {parseOmimClinicalSynopsis} from "@/parsers/parseOmimClinicalSynopsis.js";
import {parsersOMIMDisorders} from "@/parsers/parsersOMIMDisorders.js";
import {write} from "@/io/saveFile.js";
import { HttpProxy, ProxyService } from "@/proxyService/proxyService.js"

// @ts-ignore
import omimItems from "../output/list_of_OMIM_disorder_codes.json" assert { type: 'json' }

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

const getOmimUrlByCode = (code: string) => {
  return `https://omim.org/clinicalSynopsis/${code}`
}
export async function parse_list_of_omim(codes: string[]) {
  const proxyList: HttpProxy[] = proxies.map((item) => item.split(':')).map((proxy) => ({host: proxy[0], port: +proxy[1]}))
  const proxyService = new ProxyService(proxyList)
  
  for (let code of codes) {
    const url = getOmimUrlByCode(code)
    const proxy = proxyService.current()
    try
    {
      const errMessage = `proxy: ${proxy.host} url: ${url} \n`
      logger.appendError(errMessage)
      const result = await parseOMIM(url, proxy)
      saveObject(`${code}.json`, result)
      proxyService.next()
    }
    catch (err) {
      const errMessage = `err: ${err.message}, proxy: ${proxy.host} url: ${url} \n`
      logger.appendError(errMessage)
      proxyService.next()
    }
  }
  
  // for (let prox of proxyList) {
  //   const url = getOmimUrlByCode('162200')
  //   const proxy = proxyService.current()
  //   try
  //   {
  //     const errMessage = `proxy: ${proxy.host} url: ${url} \n`
  //     logger.appendError(errMessage)
  //     const result = await parseOMIM(url, prox)
  //     saveObject(`${162200}.json`, result)
  //     // proxyService.next()
  //   }
  //   catch (err) {
  //     const errMessage = `err: ${err.message}, proxy: ${proxy.host} url: ${url} \n`
  //     logger.appendError(errMessage)
  //     // proxyService.next()
  //   }
  // }
}

const omimUrlList = omimItems.map(omimItem => omimItem.code).filter((code) => code.slice(0, 2) === '16')
parse_list_of_omim(omimUrlList.splice(0, 100))

parse_list_of_OMIM_disorder_codes().then(result => {
  saveObject('list_of_OMIM_disorder_codes.json', result)
})

function saveObject(filename, obj: any){
  const result = JSON.stringify(obj, null, 1);
  // console.log(`${filename}`, result);
  write(`output/${filename}`,  result);
}
