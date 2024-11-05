import {ActivesubstanceDTO} from "./activesubstance-d-t-o";
import {ActivesubstanceModel} from "../model/activesubstance-model";

export class ActiveSubstanceConflictDTO {
    activesubstanceDTO: ActivesubstanceDTO;
    activeSubstanceDTOList: ActivesubstanceDTO[];
    activesubstanceDTO2?: ActivesubstanceDTO;


    constructor(activesubstanceDTO: ActivesubstanceDTO, activeSubstanceDTOList: ActivesubstanceDTO[], activesubstanceDTO2?: ActivesubstanceDTO) {
        this.activesubstanceDTO = activesubstanceDTO;
        this.activeSubstanceDTOList = activeSubstanceDTOList;
        this.activesubstanceDTO2 = activesubstanceDTO2;
    }
}
