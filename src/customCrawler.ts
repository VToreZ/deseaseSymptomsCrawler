import Crawler, { CrawlerRequestResponse,  } from "crawler"
export type ONSuccess = (res: CrawlerRequestResponse) => void
export type ONError = (e: Error) => void

export function createCrawlerInstance(onSuccess: ONSuccess, onError: ONError) {
  return new Crawler({
    maxConnections: 10,
    // jQuery: false,
    encoding: null,
    callback: (error, res, done) => {
      if (error) {
        onError(error)
      } else {
        setTimeout(() => onSuccess(res), 1000)
        // onSuccess(res);
      }
      done()
    }
  });
}
