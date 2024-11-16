import {DiseaseModel} from "./diseaseModel";
import {ActivesubstanceModel} from "./activesubstance-model";

export interface DiseaseActiveSubstanceModel {
    diseaseDTO: DiseaseModel;
    activeSubstanceDTO: ActivesubstanceModel[];
}
