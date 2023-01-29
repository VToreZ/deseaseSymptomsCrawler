import proxies from "@/assets/proxyPublic.json" assert { type: 'json' }
import {downloadDom} from "@/crawler/downloadDom.js";
import { Logger } from "@/logger/logger.js"
import {parseOmimClinicalSynopsis} from "@/parsers/parseOmimClinicalSynopsis.js";
import {parsersOMIMDisorders} from "@/parsers/parsersOMIMDisorders.js";
import {write} from "@/io/saveFile.js";
import { HttpProxy } from "@/proxyService/httpProxy.js"
import { THttpsProxy, ProxyService } from "@/proxyService/proxyService.js"
import * as fs from "fs"

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
  
  // const proxyList = proxyService.getProxyList()
  const proxyService = new ProxyService()
  const fileNames = fs.readdirSync('output')
  
  for (let code of codes) {
    const url = getOmimUrlByCode(code)
    const proxy = proxyService.current
  
    // console.log(fileNames)
    
    const isDataExistForCode = fileNames.some(fileName => fileName === `${code}.json`)
    if (isDataExistForCode) continue;
    
    console.log(proxy.host)
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

const omimUrlList = omimItems.map(omimItem => omimItem.code)//.filter((code) => code.slice(0, 2) === '16')
parse_list_of_omim(omimUrlList.slice(0, 100))
console.log(omimUrlList.slice(0, 100).find(url => url === '278400'))


parse_list_of_OMIM_disorder_codes().then(result => {
  saveObject('list_of_OMIM_disorder_codes.json', result)
})

function saveObject(filename, obj: any){
  const result = JSON.stringify(obj, null, 1);
  // console.log(`${filename}`, result);
  write(`output/${filename}`,  result);
}
