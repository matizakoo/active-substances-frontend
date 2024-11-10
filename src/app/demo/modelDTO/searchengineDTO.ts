import {DiseaseModel} from "../model/diseaseModel";
import {ActivesubstanceModel} from "../model/activesubstance-model";

export class SearchengineDTO {
    diseaseModelDTO: DiseaseModel;
    diseaseModelDTOList: DiseaseModel[];
    activesubstanceModel: ActivesubstanceModel[];
    pregnance: boolean;


    constructor(diseaseModelDTO: DiseaseModel, diseaseModelDTOList: DiseaseModel[], activesubstanceModel: ActivesubstanceModel[], pregnance: boolean) {
        this.diseaseModelDTO = diseaseModelDTO;
        this.diseaseModelDTOList = diseaseModelDTOList;
        this.activesubstanceModel = activesubstanceModel;
        this.pregnance = pregnance;
    }
}
