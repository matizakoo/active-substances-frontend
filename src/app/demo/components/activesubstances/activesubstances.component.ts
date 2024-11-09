import {Component, OnInit} from '@angular/core';
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {ToastService} from "../../service/toast.service";
import {ActivesubstancesTableComponent} from "../activesubstances-table/activesubstances-table.component";
import {RefreshService} from "../../service/refresh.service";

@Component({
    selector: 'app-activesubstances',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        FormsModule,
        CheckboxModule,
        ToastModule,
        ActivesubstancesTableComponent
    ],
    templateUrl: './activesubstances.component.html',
    styleUrl: './activesubstances.component.scss'
})
export class ActivesubstancesComponent implements OnInit{
    activeSubstanceForm: FormGroup;
    pregnance: boolean;
    message: string | null = null;

    constructor(
        private fb: FormBuilder,
        private activeSubstanceService: ActivesubstancesService,
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
        if (this.activeSubstanceForm.valid) {
            const newSubstance: ActivesubstanceModel = this.activeSubstanceForm.value;
            this.activeSubstanceService.addActiveSubstance(newSubstance).subscribe({
                next: (response) => {
                    this.message = 'Dodano substancje aktywną'
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

    ngOnInit(): void {

    }
}
