import {ActivesubstanceModel} from "../model/activesubstance-model";
import {ActivesubstanceDto} from "./activesubstance-dto";

export class DiseaseDTO {
    id: number;
    name: string;
    description: string;
    activeSubstancesDTOList: ActivesubstanceDto[];

    constructor(name: string, description: string, activeSubstancesDTOList: ActivesubstanceDto[]) {
        this.name = name;
        this.description = description;
        this.activeSubstancesDTOList = activeSubstancesDTOList;
    }
}
