import {DiseaseDTO} from "../modelDTO/disease-dto";
import {ActivesubstanceModel} from "./activesubstance-model";
import {DiseaseModel} from "./diseaseModel";

export interface SearchEngineModel {
    disease: DiseaseModel;
    activeSubstances: ActivesubstanceModel[];
}
