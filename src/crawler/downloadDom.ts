import {JSDOM} from "jsdom";
import { fetchData } from "@/crawler/fetchData.js";

export async function downloadDom(url)
{
    const res = await fetchData(url);
    if (!res) return null;

    const html = res.data
    const dom = new JSDOM(html)
    return dom;
}
