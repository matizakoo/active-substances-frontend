import {ActivesubstanceModel} from "./activesubstance-model";

export interface ActiveSubstanceConflictModel {
    activesubstanceModel: ActivesubstanceModel;
    activeSubstanceDTOList: ActivesubstanceModel[];
    activesubstanceDTO2?: ActivesubstanceModel;
}
