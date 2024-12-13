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
import {MultiSelectModule} from "primeng/multiselect";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {DiseaseService} from "../../service/disease.service";
import {RefreshService} from "../../service/refresh.service";
import {ToastService} from "../../service/toast.service";
import {DiseaseDTO} from "../../modelDTO/disease-dto";
import {ActiveSubstanceConflictDTO} from "../../modelDTO/activesubstancesconflict-dto";
import {DropdownModule} from "primeng/dropdown";
import {Confirmation, ConfirmationService, SelectItem} from "primeng/api";
import {ActivesubstancesconflictsService} from "../../service/activesubstancesconflicts.service";
import {InfoDTO} from "../../../info-dto";
import {ActiveSubstanceConflictModel} from "../../model/activesubstancesconflict-model";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgForOf} from "@angular/common";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-activesubstances-conflicts',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        RadioButtonModule,
        FormsModule,
        CheckboxModule,
        ToastModule,
        DiseasesTableComponent,
        MultiSelectModule,
        DropdownModule,
        MatTooltipModule,
        NgForOf,
        TableModule,
        RippleModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
  templateUrl: './activesubstances-conflicts.component.html',
  styleUrl: './activesubstances-conflicts.component.scss'
})
export class ActivesubstancesConflictsComponent implements OnInit{
    diseasesForm: FormGroup;
    myForm: FormGroup;
    activeSubstances: ActivesubstanceModel[] = [];
    selectedSubstances: ActivesubstanceModel[] = [];
    message: string | null = null;
    chooseSubstance: ActivesubstanceModel;
    substanceConflicts: ActiveSubstanceConflictModel[];

    constructor(private fb: FormBuilder,
                private activeSubstancesService: ActivesubstancesService,
                private activesubstancesconflictsService: ActivesubstancesconflictsService,
                private refreshService: RefreshService,
                private toast: ToastService,
                private confirmation: ConfirmationService) {
    }

    ngOnInit(): void {
        this.getSubstanceConflicts();
        this.getActiveSubstances();
        this.diseasesForm = this.fb.group({
            selectedSubstances: [[], Validators.required],
            chooseSubstance: ['', Validators.required]
        });
        this.refreshService.refreshNeeded$.subscribe(() => {
            this.getSubstanceConflicts();
        });
    }

    onSubmit() {
        if (this.diseasesForm.valid) {
            const activeSubstanceConflictDTO: ActiveSubstanceConflictDTO = new ActiveSubstanceConflictDTO(
                this.diseasesForm.get('chooseSubstance').value,
                this.diseasesForm.get('selectedSubstances').value);

            console.log(activeSubstanceConflictDTO)

            this.activesubstancesconflictsService.addSubstanceConflicts(activeSubstanceConflictDTO).subscribe({
                next: (response) => {
                    const infoDTO: InfoDTO = response.body;
                    this.message = infoDTO.info;
                    if (this.message == null)
                        this.toast.showSuccess('Pomyślnie dodano skonfliktowane substancje czynne', 'Sukces');
                    else
                        this.toast.showWarn(this.message, 'Dodano substancje czynne');
                    this.getSubstanceConflicts();
                },
                error: (error) => {
                    this.message = error.error.info
                    this.toast.showError( 'Nie udało się dodać ', this.message);
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

    getSubstanceConflicts(): void {
        this.activesubstancesconflictsService.getSubstanceConflicts().subscribe({
            next: (data) => {
                this.substanceConflicts = data;
            },
            error: (err) => {
                console.error('Błąd podczas pobierania konfliktów substancji:', err);
            }
        });
    }

    confirmDelete(id: number, id2: number) {
        this.confirmation.confirm({
            message: 'Czy na pewno chcesz usunąć ten element?',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.activesubstancesconflictsService.deleteSustancesConflict(id, id2).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Udało się usunąć konflikt', 'Sukces');
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
