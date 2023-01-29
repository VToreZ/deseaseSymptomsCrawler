export class HttpProxy
{
  public host
  public port
  public auth
  constructor(proxyItem: string)
  {
    const splitedProxy = proxyItem.split(':')
    
    this.host = splitedProxy[0]
    this.port = splitedProxy[1]
    this.auth = splitedProxy[2] + ':' + splitedProxy[3];
  }
}
