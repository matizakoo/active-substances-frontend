import {ActivesubstanceModel} from "./activesubstance-model";
import {ActivesubstanceDto} from "../modelDTO/activesubstance-dto";

export interface DiseaseModel {
    id: number;
    name: string;
    description: string;
    pregnance: boolean;
    dosage: string;
    activeSubstancesDTOList: ActivesubstanceModel[];
}
