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
import {CheckboxModule} from "primeng/checkbox";
import {SearchengineDTO} from "../../modelDTO/searchengineDTO";
import {AsSearchEngineService} from "../../service/as-search-engine.service";
import {SearchEngineModel} from "../../model/searchEngine-model";

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
        RippleModule,
        CheckboxModule
    ],
  templateUrl: './as-search-engine.component.html',
  styleUrl: './as-search-engine.component.scss'
})
export class AsSearchEngineComponent {
    diseasesForm: FormGroup;
    form: FormGroup;
    activeSubstances: ActivesubstanceModel[] = [];
    message: string | null = null;
    chooseSubstance: ActivesubstanceModel[];
    substanceConflicts: ActiveSubstanceConflictModel[];
    diseaseModel: DiseaseModel[] = [];
    selectedSubstancesDiseases: DiseaseModel[] = [];
    selectUsedActiveSubstances: ActivesubstanceModel[] = [];
    activesubstancesdiseasesModels: ActivesubstancesdiseasesModel[] = [];
    searchEngineModel: SearchEngineModel[] = [];

    constructor(private fb: FormBuilder,
                private activeSubstancesService: ActivesubstancesService,
                private activesubstancesDiseasesConflictService: ActivesubstancesDiseasesConflictService,
                private activesubstancesconflictsService: ActivesubstancesconflictsService,
                private refreshService: RefreshService,
                private toast: ToastService,
                private searchEngine: AsSearchEngineService,
                private diseaseService: DiseaseService,
                private cdr: ChangeDetectorRef) {
        this.diseasesForm = this.fb.group({
            selectedSubstancesDiseases: [[]],
            chooseSubstance: ['', Validators.required],
            selectUsedActiveSubstances: [[]],
            pregnance: [false]
        });
    }

    getDiseases(): void {
        this.diseaseService.getDiseasesWithActiveSubstances().subscribe({
            next: (data) => {
                this.diseaseModel = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji czynnych:', err)
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
            },
            error: (err) => {
                console.error('Błąd podczas pobierania konfliktów substancji:', err);
            }
        });

    }

    onSubmit() {
        if (this.diseasesForm.valid) {
            const searchengine: SearchengineDTO = new SearchengineDTO(
                this.diseasesForm.get('chooseSubstance').value,
                this.diseasesForm.get('selectedSubstancesDiseases').value,
                this.diseasesForm.get('selectUsedActiveSubstances').value,
                this.diseasesForm.get('pregnance').value
            );

            console.log(searchengine)

            this.searchEngine.getActiveSubstanceSearchEngine(searchengine).subscribe({
                next: (data: SearchEngineModel[]) => {
                    this.searchEngineModel = data;
                    this.toast.showSuccess('Udało się znaleźć szukane substancje', 'Sukces');
                    console.log('return: ', this.searchEngineModel);
                },
                error: (error) => {
                    console.error('Błąd pobierania danych: ', error);
                    this.toast.showError('Nie udało się pobrać danych', 'Błąd');
                }
            });
        }
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
