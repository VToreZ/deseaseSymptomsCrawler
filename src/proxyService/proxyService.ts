import { HttpProxy } from "@/proxyService/httpProxy.js"
import * as fs from "fs"

export type THttpsProxy = {
  host: string,
  port: number,
  auth?: string
}


export class ProxyService
{
  private index: number
  
  constructor()
  {
    this.index = 0
  }
  
  public get proxyList(): HttpProxy[] {
    // list of proxy in fromat ip:port:login:pass
    const proxies = fs.readFileSync('src/assets/proxyPrivate.txt', 'utf-8');
    const splitProxies = proxies.split('\n').filter(proxy => proxy != '');
    
    const output = splitProxies.map((proxy, index) => {
      return new HttpProxy(proxy)
    });
    return output
  }
  
  next(): void
  {
    const { index, proxyList } = this
    if (index !== proxyList.length - 1)
    {
      this.index++
    } else
    {
      this.index = 0
    }
  }
  
  public get current(): HttpProxy
  {
    // console.log(this.proxyList[this.index])
    return this.proxyList[this.index]
  }
  

  
}
