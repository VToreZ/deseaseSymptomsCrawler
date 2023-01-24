import { HttpProxy } from "@/proxyService/proxyService.js"
import console from "console";
import axios, { AxiosResponse } from "axios"
export async function fetchData(url: string, proxy?: HttpProxy): Promise<AxiosResponse>
{
    console.log("Crawling data...")
    // make http call to url
    const response = await axios.get(url, {proxy} ).catch((err) => console.error(err))
    if (!response) {
        throw new Error("Host is not responding")
        // return;
    }
    
    if (response.status === 403) {
        throw new Error("Proxy is banned")
    }

    if (response.status !== 200)
    {
        throw new Error("Error occurred while fetching data")
    }
    
    return response
}

export async function fetchDataQueued(urls: string[], queueLength: number) {

}
