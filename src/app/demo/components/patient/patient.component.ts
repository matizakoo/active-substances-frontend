import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivesubstancesTableComponent} from "../activesubstances-table/activesubstances-table.component";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ToastService} from "../../service/toast.service";
import {RefreshService} from "../../service/refresh.service";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {PatientDto} from "../../modelDTO/patient-dto";
import {PatientService} from "../../service/patient.service";
import {PatientTableComponent} from "../patient-table/patient-table.component";
import {ConfirmationService} from "primeng/api";
import {ConfirmationComponent} from "../uikit/menus/confirmation.component";

@Component({
  selector: 'app-patient',
  standalone: true,
    imports: [
        ActivesubstancesTableComponent,
        ButtonModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        ToastModule,
        PatientTableComponent
    ],
    providers: [ConfirmationService],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit{
    activeSubstanceForm: FormGroup;
    pregnance: boolean;
    message: string | null = null;
    refreshTrigger: boolean = false;
    @ViewChild('patientTable') patientTable: PatientTableComponent;

    constructor(
        private fb: FormBuilder,
        private patientService: PatientService,
        private toast: ToastService,
        private refreshService: RefreshService,
    ) {
        this.activeSubstanceForm = this.fb.group({
            name: ['', Validators.required],
            pregnance: [false],
            dosage: ['', Validators.required],
            description: ['']
        });
    }

    onSubmit() {
        if (this.newPatient.valid) {
            const patient: PatientDto = this.newPatient.value;
            console.log(patient)
            this.patientService.addPatient(patient).subscribe({
                next: (response) => {
                    this.message = 'Dodano pacjenta'
                    this.toast.showSuccess( 'Sukces', this.message);
                    this.refreshTrigger = !this.refreshTrigger;
                },
                error: (error) => {
                    this.message = error.error.info
                    this.toast.showError( 'Nie udało się dodać ', this.message);
                }
            });
        }
        this.newPatient.reset();
    }

    newPatient: FormGroup;

    ngOnInit(): void {
        this.newPatient = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            uniqueId: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            age: ['', Validators.required],
            gender: ['', Validators.required]
        });
    }
}
