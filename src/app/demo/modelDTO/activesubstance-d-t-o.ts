export class ActivesubstanceDTO {
    id: number;
    name: string;
    pregnance: boolean;
    dosage: string;
    description: string;
    constructor(id: number, name: string, pregnance: boolean, dosage: string, description: string) {
        this.id = id;
        this.name = name;
        this.pregnance = pregnance;
        this.dosage = dosage;
        this.description = description;
    }
}
