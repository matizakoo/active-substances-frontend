import {ActivesubstanceModel} from "../model/activesubstance-model";
import {ActivesubstanceDTO} from "./activesubstance-d-t-o";

export class DiseaseDTO {
    name: string;
    description: string;
    activeSubstancesDTOList: ActivesubstanceDTO[];

    constructor(name: string, description: string, activeSubstancesDTOList: ActivesubstanceDTO[]) {
        this.name = name;
        this.description = description;
        this.activeSubstancesDTOList = activeSubstancesDTOList;
    }
}
