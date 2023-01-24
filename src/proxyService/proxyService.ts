export type HttpProxy = {
  host: string,
  port: number,
}


export class ProxyService
{
  private index: number
  
  public proxies: HttpProxy[]
  
  
  constructor(proxyList: HttpProxy[])
  {
    this.proxies = proxyList
    this.index = 0
  }
  
  next(): void
  {
    const { index, proxies } = this
    if (index === proxies.length - 1)
    {
      this.index++
    } else
    {
      this.index = 0
    }
  }
  
  current(): HttpProxy
  {
    return this.proxies[this.index]
  }
  
}
