import {Component, OnInit} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {DiseasesTableComponent} from "../diseases-table/diseases-table.component";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {RefreshService} from "../../service/refresh.service";
import {DiseaseService} from "../../service/disease.service";
import {ToastService} from "../../service/toast.service";
import {CommonModule} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {DiseaseDTO} from "../../modelDTO/disease-dto";

@Component({
  selector: 'app-diseases',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        FormsModule,
        CheckboxModule,
        ToastModule,
        DiseasesTableComponent,
        MultiSelectModule
    ],
  templateUrl: './diseases.component.html',
})
export class DiseasesComponent implements OnInit{
    diseasesForm: FormGroup;
    activeSubstances: ActivesubstanceModel[] = [];
    selectedSubstances: ActivesubstanceModel[] = [];
    message: string | null = null;

    constructor(private fb: FormBuilder,
                private activeSubstancesService: ActivesubstancesService,
                private diseaseService: DiseaseService,
                private refreshService: RefreshService,
                private toast: ToastService) {
    }

    ngOnInit(): void {
        this.getActiveSubstances();

        this.diseasesForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            selectedSubstances: [[], Validators.required]
        });
    }

    onSubmit() {
        if (this.diseasesForm.valid) {
            const newDisease: DiseaseDTO = new DiseaseDTO(this.diseasesForm.get('name').value,
                this.diseasesForm.get('description').value,
                this.diseasesForm.get('selectedSubstances').value);

            console.log(newDisease)
            this.diseaseService.addDisease(newDisease).subscribe({
                next: (response) => {
                    this.message = 'Dodano chorobę wraz z ', this.diseasesForm.get('selectedSubstances').value.length, ' substancjami czynnymi'
                    this.toast.showSuccess( 'Sukces', this.message);
                    this.refreshService.triggerRefresh();
                },
                error: (error) => {
                    this.message = error.error.info
                    this.toast.showError( 'Nie udało się dodać ', this.message);
                }
            });
        }
    }

    get activeSubstancesControls(): FormArray {
        return this.diseasesForm.get('activeSubstances') as FormArray;
    }

    getActiveSubstances(): void {
        this.activeSubstancesService.getActiveSubstances().subscribe({
            next: (data) => {
                this.activeSubstances = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji czynnych:', err)
        });
    }
}
