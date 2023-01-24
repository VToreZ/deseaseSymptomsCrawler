export class Symptoms {
    element: Element
    constructor(element: Element){
        this.element = element;
    }

    getCaption(){
        return this.element.querySelector('em')?.textContent.trim()
    }
    getSymptoms(){
        return [...this.element.querySelectorAll('span.mim-font:not(.h5)')]
            .flatMap(value => this.parseSymptomsList(value.textContent))
    }

    private parseSymptomsList(symptomsListString: string) {
        return symptomsListString.trim()
            .replaceAll('- ', '')
            .split('\n')
            .map(value => value.trim())
    }
}
