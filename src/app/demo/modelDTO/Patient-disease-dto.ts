import {UserModel} from "../model/user-model";
import {PatientDto} from "./patient-dto";
import {DiseaseActiveSubstanceModel} from "../model/diseaseActiveSubstance-model";
import {DiseaseActiveSubstanceDto} from "./disease-active-substance-dto";

export class PatientDiseaseDto {
    userDTO: UserModel;
    patientDTO: PatientDto;
    diseaseActiveSubstancesDTOList: DiseaseActiveSubstanceDto[];


    constructor(userDTO: UserModel, patientDTO: PatientDto, diseaseActiveSubstancesDTOList: DiseaseActiveSubstanceDto[]) {
        this.userDTO = userDTO;
        this.patientDTO = patientDTO;
        this.diseaseActiveSubstancesDTOList = diseaseActiveSubstancesDTOList;
    }
}
