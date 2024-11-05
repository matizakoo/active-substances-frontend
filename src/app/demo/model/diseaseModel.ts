import {ActivesubstanceModel} from "./activesubstance-model";
import {ActivesubstanceDTO} from "../modelDTO/activesubstance-d-t-o";

export interface DiseaseModel {
    id: number;
    name: string;
    description: string;
    activeSubstancesDTOList: ActivesubstanceModel[];
}
