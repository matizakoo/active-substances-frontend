import {DiseaseModel} from "../model/diseaseModel";
import {ActivesubstanceModel} from "../model/activesubstance-model";

export class DiseaseActiveSubstanceDto {
    diseaseDTO: DiseaseModel;
    activeSubstanceDTO: ActivesubstanceModel[];

    constructor(diseaseDTO: DiseaseModel, activeSubstanceDTO: ActivesubstanceModel[]) {
        this.diseaseDTO = diseaseDTO;
        this.activeSubstanceDTO = activeSubstanceDTO;
    }
}
