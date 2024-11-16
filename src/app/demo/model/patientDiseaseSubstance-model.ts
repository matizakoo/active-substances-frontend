import {UserModel} from "./user-model";
import {PatientDto} from "../modelDTO/patient-dto";
import {PatientModel} from "./patient-model";
import {DiseaseActiveSubstanceModel} from "./diseaseActiveSubstance-model";

export interface PatientDiseaseSubstanceModel {
    userDTO: UserModel;
    patientDTO: PatientModel;
    diseaseActiveSubstancesDTOList: DiseaseActiveSubstanceModel[];
}
