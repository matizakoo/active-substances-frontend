import {ActivesubstanceModel} from "./activesubstance-model";
import {DiseaseDTO} from "../modelDTO/disease-dto";

export interface ActivesubstancesdiseasesModel {
    activesubstanceDTO: ActivesubstanceModel;
    diseaseDTO: DiseaseDTO[];
}
