import {ActivesubstanceModel} from "../model/activesubstance-model";
import {ActivesubtanceDTO} from "./activesubtance-dto";

export class DiseaseDTO {
    name: string;
    description: string;
    activeSubstancesDTOList: ActivesubtanceDTO[];

    constructor(name: string, description: string, activeSubstancesDTOList: ActivesubtanceDTO[]) {
        this.name = name;
        this.description = description;
        this.activeSubstancesDTOList = activeSubstancesDTOList;
    }
}
