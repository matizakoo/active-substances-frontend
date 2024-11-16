export class PatientDto {
    id: number;
    name: string;
    surname: string;
    uniqueId: number;
    age: number;
    gender: string;


    constructor(name: string, surname: string, uniqueId: number, age: number, gender: string) {
        this.name = name;
        this.surname = surname;
        this.uniqueId = uniqueId;
        this.age = age;
        this.gender = gender;
    }
}
