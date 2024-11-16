import {UserModel} from "./user-model";

export class PatientModel {
    id: number;
    name: string;
    surname: string;
    uniqueId: number;
    age: number;
    gender: string;
    userModel: UserModel;
}
