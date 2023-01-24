import {
    List_of_OMIM_disorder_codes
} from "@/pageObjects/wiki/list_of_OMIM_disorder_codes/list_of_OMIM_disorder_codes.js";

export function parsersOMIMDisorders(body: HTMLElement){
    const listOfDisorders = new List_of_OMIM_disorder_codes(body)
    return listOfDisorders.getDisordersFormattedList();
}
