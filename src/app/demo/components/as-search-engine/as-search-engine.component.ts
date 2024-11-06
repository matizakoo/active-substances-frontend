import {ChangeDetectorRef, Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MultiSelectModule} from "primeng/multiselect";
import {CommonModule, NgForOf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActiveSubstanceConflictModel} from "../../model/activesubstancesconflict-model";
import {DiseaseModel} from "../../model/diseaseModel";
import {ActivesubstancesdiseasesModel} from "../../model/activesubstancesdiseases-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ActivesubstancesDiseasesConflictService} from "../../service/activesubstances-diseases-conflict.service";
import {ActivesubstancesconflictsService} from "../../service/activesubstancesconflicts.service";
import {RefreshService} from "../../service/refresh.service";
import {ToastService} from "../../service/toast.service";
import {DiseaseService} from "../../service/disease.service";
import {ActivesubstancesDiseaseDto} from "../../modelDTO/activesubstances-disease-dto";
import {InfoDTO} from "../../../info-dto";
import {RippleModule} from "primeng/ripple";

interface DropdownOption {
    label: string;
    value: string;
}

@Component({
  selector: 'app-as-search-engine',
  standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        MatTooltipModule,
        MultiSelectModule,
        NgForOf,
        ReactiveFormsModule,
        SharedModule,
        TableModule,
        ToastModule,
        CommonModule,
        RippleModule
    ],
  templateUrl: './as-search-engine.component.html',
  styleUrl: './as-search-engine.component.scss'
})
export class AsSearchEngineComponent {
    diseasesForm: FormGroup;
    myForm: FormGroup;
    form: FormGroup;
    activeSubstances: ActivesubstanceModel[] = [];
    message: string | null = null;
    chooseSubstance: ActivesubstanceModel;
    substanceConflicts: ActiveSubstanceConflictModel[];
    diseaseModel: DiseaseModel[] = [];
    selectedSubstancesDiseases: DiseaseModel[] = [];
    activesubstancesdiseasesModels: ActivesubstancesdiseasesModel[] = [];

    constructor(private fb: FormBuilder,
                private activeSubstancesService: ActivesubstancesService,
                private activesubstancesDiseasesConflictService: ActivesubstancesDiseasesConflictService,
                private activesubstancesconflictsService: ActivesubstancesconflictsService,
                private refreshService: RefreshService,
                private toast: ToastService,
                private diseaseService: DiseaseService,
                private cdr: ChangeDetectorRef) {
        this.diseasesForm = this.fb.group({
            selectedSubstancesDiseases: [[], Validators.required],
            chooseSubstance: ['', Validators.required],
        });
    }

    dropdowns = [{ selected: null }];

    // addDropdown(index: number) {
    //     // Sprawdzenie, czy liczba dropdownów jest mniejsza niż liczba elementów w diseaseModel
    //     if (index === this.dropdowns.length - 1 && this.dropdowns.length < this.diseaseModel.length) {
    //         this.dropdowns.push({ selected: null }); // Dodajemy na końcu tablicy
    //     }
    // }
    addDropdown() {
        if (this.dropdowns.length < this.diseaseModel.length) {
            this.dropdowns.push({ selected: null });
            this.cdr.detectChanges(); // Wymusza natychmiastową detekcję zmian
        }
    }

    removeDropdown(index: number) {
        // Usuwamy dropdown tylko wtedy, gdy lista zawiera więcej niż jeden element
        if (this.dropdowns.length > 1) {
            this.dropdowns.splice(index, 1);
        }
    }

    // options: DropdownOption[] = [
    //     { label: 'Opcja 1', value: '1' },
    //     { label: 'Opcja 2', value: '2' },
    //     { label: 'Opcja 3', value: '3' }
    // ];
    //
    // dropdowns = [{ selected: null }]; // Inicjalnie jeden dropdown
    //
    // addDropdown(index: number) {
    //     // Sprawdzenie, czy liczba dropdownów jest mniejsza niż liczba opcji
    //     if (index === this.dropdowns.length - 1 && this.dropdowns.length < this.options.length) {
    //         this.dropdowns.push({ selected: null });
    //     }
    // }
    //
    // removeDropdown(index: number) {
    //     // Usuwa dropdown na podstawie indeksu
    //     if (this.dropdowns.length > 1) {
    //         this.dropdowns.splice(index, 1);
    //     }
    // }

// -------------
    getDiseases(): void {
        this.diseaseService.getDiseasesWithActiveSubstances().subscribe({
            next: (data) => {
                this.diseaseModel = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji aktywnych:', err)
        });
    }

    ngOnInit(): void {
        this.getActiveSubstancesDiseases();
        this.getActiveSubstances();
        this.getDiseases();
    }

    getActiveSubstancesDiseases(): void {
        this.activesubstancesDiseasesConflictService.getActiveSubstancesDiseasesConflict().subscribe({
            next: (data) => {
                this.activesubstancesdiseasesModels = data;
                console.log("Loaded items:", this.activesubstancesdiseasesModels);
            },
            error: (err) => {
                console.error('Błąd podczas pobierania konfliktów substancji:', err);
            }
        });

    }

    onSubmit() {
        if (this.diseasesForm.valid) {
            const activesubstancesDiseaseDto: ActivesubstancesDiseaseDto = new ActivesubstancesDiseaseDto(
                this.diseasesForm.get('chooseSubstance').value,
                this.diseasesForm.get('selectedSubstancesDiseases').value);

            console.log(activesubstancesDiseaseDto)

            this.activesubstancesDiseasesConflictService.addActiveSubstancesDiseasesConflict(activesubstancesDiseaseDto).subscribe({
                next: (response) => {
                    const infoDTO: InfoDTO = response.body;
                    this.message = infoDTO.info;
                    this.toast.showSuccess('Pomyślnie dodano skonfliktowane substancje aktywną z chorobami', 'Sukces');
                    this.getActiveSubstancesDiseases();
                },
                error: (error) => {
                    this.message = error.error.info
                    this.toast.showError( this.message, 'Nie udało się dodać ');
                }
            });
        }
    }

    getActiveSubstances(): void {
        this.activeSubstancesService.getActiveSubstances().subscribe({
            next: (data) => {
                this.activeSubstances = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji aktywnych:', err)
        });
    }
}
