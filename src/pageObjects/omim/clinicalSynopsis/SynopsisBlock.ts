import {Symptoms} from "./Symptoms.js";

export class SynopsisBlock {
    element: Element
    constructor(element: Element){
        this.element = element;
    }

    getCaption(){
        // HEAD & NECK
        return this.element.querySelector('strong')?.textContent.trim();
    }

    getSymptomsBlock(): Symptoms[] {
        const symptomsBlock = this.element.querySelector('[style="margin-left: 2em;"]');
        if(!symptomsBlock){
            // Почему-то тут иногда null
            return []
        }
        /// Ищем блоки с подзаголовками вроде Head и Eyes
        const symptomsSubBlocks = symptomsBlock.children;
        const symptoms = symptomsSubBlocks.length > 0 ? [...symptomsSubBlocks]: [symptomsBlock];
        return symptoms.map(element => new Symptoms(element));
    }
}
