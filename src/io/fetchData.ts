import console from "console";
import axios from "axios";

export async function fetchData(url)
{
    console.log("Crawling data...")
    // make http call to url
    const response = await axios(url).catch((err) => console.error(err))
    if (!response) return

    if (response.status !== 200)
    {
        console.log("Error occurred while fetching data")
        return
    }
    return response
}
