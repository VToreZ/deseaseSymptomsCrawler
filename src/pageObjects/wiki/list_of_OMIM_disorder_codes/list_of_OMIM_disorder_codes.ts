
export class List_of_OMIM_disorder_codes {
    element: Element
    constructor(element: Element){
        this.element = element;
    }

    private getListRow() {
        return [...this.element.querySelectorAll('#mw-content-text > div.mw-parser-output > ul > li')];
    }

    private getDisordersList() {
        //  Есть один некорректный случай (последний элемент)
        return this.getListRow().map(value => value.textContent);
    }
    getDisordersFormattedList() {
        return this.getDisordersList().map(str => {
            const result = str.split(';');

            //  Есть один некорректный случай, фильтруем его
            if(result.length < 3) return null;

            return {
                caption: result[0].trim(),
                code: result[1].trim(),
                gene: result[2].trim()
            }
        }).filter(Boolean)
    }
}
