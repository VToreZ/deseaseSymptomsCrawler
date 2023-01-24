import { HttpProxy } from "@/proxyService/proxyService.js"
import {JSDOM} from "jsdom";
import {fetchData} from "@/io/fetchData.js";

export async function downloadDom(url, proxy?: HttpProxy): Promise<JSDOM>
{
    const res = await fetchData(url, proxy);
    if (!res) return null;

    const html = res.data
    const dom = new JSDOM(html)
    return dom;
}
