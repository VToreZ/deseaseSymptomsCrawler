import {SynopsisBlock} from "./SynopsisBlock.js";


export class ClinicalSynopsis {
    element: Element
    constructor(element: Element){
        this.element = element;
    }

    removeUnusedElements() {
        // Удаляем мусорные теги
        this.element.querySelectorAll(".hidden").forEach(value => value.remove())
        this.element.querySelectorAll("a").forEach(value => value.remove())
        return this;
    }

    getClinicalSynopsis(){
        return [...this.element.querySelectorAll("#mimClinicalSynopsis > div:not([id])")].map(value => new SynopsisBlock(value));
    }

}
