import {ActivesubstanceModel} from "./activesubstance-model";
import {ActivesubtanceDTO} from "../modelDTO/activesubtance-dto";

export interface DiseaseModel {
    id: number;
    name: string;
    description: string;
    activeSubstancesDTOList: ActivesubstanceModel[];
}
