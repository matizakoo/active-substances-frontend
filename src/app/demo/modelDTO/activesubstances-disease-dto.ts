import {ActivesubstanceDto} from "./activesubstance-dto";
import {DiseaseDTO} from "./disease-dto";

export class ActivesubstancesDiseaseDto {
    activesubstanceDTO: ActivesubstanceDto;
    diseaseDTO: DiseaseDTO[];

    constructor(activesubstanceDTO: ActivesubstanceDto, diseaseDTO: DiseaseDTO[]) {
        this.activesubstanceDTO = activesubstanceDTO;
        this.diseaseDTO = diseaseDTO;
    }
}
