import { HttpProxy } from "@/proxyService/httpProxy.js"
import { THttpsProxy } from "@/proxyService/proxyService.js"
import console from "console"
import axios, { AxiosResponse } from "axios"
import https from "https-proxy-agent"

// const proxyList: HttpProxy[] = proxies.hosts.map((host, index) => ({host, port: +proxies.ports[index]}))
const DEFAULT_CONFIG = {
  headers: {
    Accept           : 'test/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'User-Agent'     : 'Mozilla/5.0' +
      ' (Macintosh;' +
      ' Intel' +
      ' Mac OS X' +
      ' 10_14_5)' +
      'AppleWebKit/605.1.15 (KHTML, like Gecko)' +
      'Version/12.1.1 Safari/605.1.15',
    'Accept-Encoding': 'gzip, deflate, br'
  }
}

export async function fetchData(url: string, proxy?: HttpProxy): Promise<AxiosResponse>
{
  console.log({ proxy })
  
  const getConfigWithProxy = () =>
  {
    
    if (proxy === undefined) return DEFAULT_CONFIG
  
    const httpsAgent = new https.HttpsProxyAgent(
      proxy
      // {host: '176.124.44.64', port: 8000, auth: 'MH7dqQ:FJhhUh'}
      // {host: '45.70.236.194', port: 999}
    )
    
    return {
      ...DEFAULT_CONFIG,
      httpsAgent
    }
  }
  
  console.log("Crawling data...")
  const response = await axios.get(url, {
    ...getConfigWithProxy()
  }).catch((err) => console.error(err))
  if (!response)
  {
    throw new Error("Host is not responding")
    // return;
  }
  
  if (response.status === 403)
  {
    throw new Error("Proxy is banned")
  }
  
  if (response.status !== 200)
  {
    throw new Error("Error occurred while fetching data")
  }
  return response
}
