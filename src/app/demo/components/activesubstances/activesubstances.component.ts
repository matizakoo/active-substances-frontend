import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivesubstancesService} from "../../service/activesubstances.service";

@Component({
  selector: 'app-activesubstances',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './activesubstances.component.html',
  styleUrl: './activesubstances.component.scss'
})
export class ActivesubstancesComponent {
    activeSubstanceForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private activeSubstanceService: ActivesubstancesService
    ) {
        console.log('token', localStorage.getItem('auth-token'))
        this.activeSubstanceForm = this.fb.group({
            name: ['', Validators.required],
            pregnance: [false],
            dosage: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.activeSubstanceForm.valid) {
            const newSubstance: ActivesubstanceModel = this.activeSubstanceForm.value;
            this.activeSubstanceService.addActiveSubstance(newSubstance).subscribe({
                next: (response) => console.log('Substancja dodana:', response),
                error: (error) => console.error('Błąd:', error)
            });
        }
    }
}
