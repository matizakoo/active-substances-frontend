import {ActivesubstanceDto} from "./activesubstance-dto";
import {ActivesubstanceModel} from "../model/activesubstance-model";

export class ActiveSubstanceConflictDTO {
    activesubstanceDTO: ActivesubstanceDto;
    activeSubstanceDTOList: ActivesubstanceDto[];
    activesubstanceDTO2?: ActivesubstanceDto;


    constructor(activesubstanceDTO: ActivesubstanceDto, activeSubstanceDTOList: ActivesubstanceDto[], activesubstanceDTO2?: ActivesubstanceDto) {
        this.activesubstanceDTO = activesubstanceDTO;
        this.activeSubstanceDTOList = activeSubstanceDTOList;
        this.activesubstanceDTO2 = activesubstanceDTO2;
    }
}
