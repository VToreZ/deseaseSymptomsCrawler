import {ClinicalSynopsis} from "@/pageObjects/omim/clinicalSynopsis/ClinicalSynopsis.js";

export function parseOmimClinicalSynopsis(body: HTMLElement){
  const clinicalSynopsis = new ClinicalSynopsis(body)
  clinicalSynopsis.removeUnusedElements();
  return clinicalSynopsis.getClinicalSynopsis().map(clinicalSynopsis => {
    return {
      caption: clinicalSynopsis.getCaption(),
      description: clinicalSynopsis.getSymptomsBlock().map(symptomsBlock => {
        return {
          dislocation: symptomsBlock.getCaption(),
          symptoms: symptomsBlock.getSymptoms()
        }
      })
    }
  });
}
