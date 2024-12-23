import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConfirmationService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActiveSubstanceConflictModel} from "../../model/activesubstancesconflict-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ActivesubstancesconflictsService} from "../../service/activesubstancesconflicts.service";
import {RefreshService} from "../../service/refresh.service";
import {ToastService} from "../../service/toast.service";
import {ActiveSubstanceConflictDTO} from "../../modelDTO/activesubstancesconflict-dto";
import {InfoDTO} from "../../../info-dto";
import {DiseaseService} from "../../service/disease.service";
import {DiseaseModel} from "../../model/diseaseModel";
import {ActivesubstancesDiseaseDto} from "../../modelDTO/activesubstances-disease-dto";
import {ActivesubstancesDiseasesConflictService} from "../../service/activesubstances-diseases-conflict.service";
import {ActivesubstancesdiseasesModel} from "../../model/activesubstancesdiseases-model";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgForOf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-activesubstances-diseases-conflicts',
  standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        ReactiveFormsModule,
        SharedModule,
        TableModule,
        ToastModule,
        MatTooltipModule,
        NgForOf,
        RippleModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
  templateUrl: './activesubstances-diseases-conflicts.component.html',
  styleUrl: './activesubstances-diseases-conflicts.component.scss'
})
export class ActivesubstancesDiseasesConflictsComponent {
    diseasesForm: FormGroup;
    myForm: FormGroup;
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
                private confirmation: ConfirmationService,
                private diseaseService: DiseaseService) {
    }

    ngOnInit(): void {
        this.getActiveSubstancesDiseases();
        this.getActiveSubstances();
        this.getDiseases();
        this.diseasesForm = this.fb.group({
            selectedSubstancesDiseases: [[], Validators.required],
            chooseSubstance: ['', Validators.required]
        });
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
            const activesubstancesDiseaseDto: ActivesubstancesDiseaseDto = new ActivesubstancesDiseaseDto(
                this.diseasesForm.get('chooseSubstance').value,
                this.diseasesForm.get('selectedSubstancesDiseases').value);

            console.log(activesubstancesDiseaseDto)

            this.activesubstancesDiseasesConflictService.addActiveSubstancesDiseasesConflict(activesubstancesDiseaseDto).subscribe({
                next: (response) => {
                    const infoDTO: InfoDTO = response.body;
                    this.message = infoDTO.info;
                    this.toast.showSuccess('Pomyślnie dodano skonfliktowane substancje czynną z chorobami', 'Sukces');
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
            error: (err) => console.error('Błąd podczas pobierania listy substancji czynnych:', err)
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

    getDiseasesForActiveSubstance(id: number): void {
        console.log(id)
        this.diseaseService.getDiseasesWithActiveSubstancesWithoutConflict(id).subscribe({
            next: (data) => {
                this.diseaseModel = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji czynnych:', err)
        });
    }

    confirmDelete(id: number, id2: number, arg1: string, arg2: string) {
        this.confirmation.confirm({
            message: `Czy relacje substancji czynnej ${arg2} wraz z ${arg1}?`,
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.activesubstancesDiseasesConflictService.deleteActiveSubstanceWithDisease(id, id2).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Udało się usunąć', 'Sukces');
                        this.refreshService.triggerRefresh();
                    },
                    error: (err) => {
                        console.error('Coś poszło nie tak')
                    }
                })
            },
            reject: () => {
            }
        });
    }
}
